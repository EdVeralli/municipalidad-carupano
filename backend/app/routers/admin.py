import secrets
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from datetime import datetime, timedelta

from ..database import get_db
from ..models import Client, Rule, Keyword, Conversation, Message
from ..schemas import (
    ClientCreate, ClientUpdate, Client as ClientSchema, ClientWithStats,
    RuleCreate, RuleUpdate, Rule as RuleSchema,
    Conversation as ConversationSchema,
    DashboardStats
)

router = APIRouter(prefix="/admin", tags=["Admin"])


# ============ CLIENTS ============

@router.post("/clients", response_model=ClientSchema)
def create_client(client: ClientCreate, db: Session = Depends(get_db)):
    """Crear un nuevo cliente"""
    # Verificar que el slug no exista
    existing = db.query(Client).filter(Client.slug == client.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="El slug ya existe")

    # Generar API key
    api_key = secrets.token_hex(32)

    db_client = Client(
        name=client.name,
        slug=client.slug,
        api_key=api_key
    )
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client


@router.get("/clients", response_model=List[ClientWithStats])
def list_clients(db: Session = Depends(get_db)):
    """Listar todos los clientes con estadísticas"""
    clients = db.query(Client).all()
    result = []

    for client in clients:
        total_rules = db.query(Rule).filter(Rule.client_id == client.id).count()
        total_conversations = db.query(Conversation).filter(Conversation.client_id == client.id).count()
        total_messages = (
            db.query(Message)
            .join(Conversation)
            .filter(Conversation.client_id == client.id)
            .count()
        )

        client_data = ClientWithStats(
            id=client.id,
            name=client.name,
            slug=client.slug,
            api_key=client.api_key,
            is_active=client.is_active,
            created_at=client.created_at,
            updated_at=client.updated_at,
            total_rules=total_rules,
            total_conversations=total_conversations,
            total_messages=total_messages
        )
        result.append(client_data)

    return result


@router.get("/clients/{client_id}", response_model=ClientWithStats)
def get_client(client_id: int, db: Session = Depends(get_db)):
    """Obtener un cliente por ID"""
    client = db.query(Client).filter(Client.id == client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")

    total_rules = db.query(Rule).filter(Rule.client_id == client.id).count()
    total_conversations = db.query(Conversation).filter(Conversation.client_id == client.id).count()
    total_messages = (
        db.query(Message)
        .join(Conversation)
        .filter(Conversation.client_id == client.id)
        .count()
    )

    return ClientWithStats(
        id=client.id,
        name=client.name,
        slug=client.slug,
        api_key=client.api_key,
        is_active=client.is_active,
        created_at=client.created_at,
        updated_at=client.updated_at,
        total_rules=total_rules,
        total_conversations=total_conversations,
        total_messages=total_messages
    )


@router.put("/clients/{client_id}", response_model=ClientSchema)
def update_client(client_id: int, client_update: ClientUpdate, db: Session = Depends(get_db)):
    """Actualizar un cliente"""
    client = db.query(Client).filter(Client.id == client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")

    if client_update.name is not None:
        client.name = client_update.name
    if client_update.is_active is not None:
        client.is_active = client_update.is_active

    db.commit()
    db.refresh(client)
    return client


# ============ RULES ============

@router.post("/clients/{client_id}/rules", response_model=RuleSchema)
def create_rule(client_id: int, rule: RuleCreate, db: Session = Depends(get_db)):
    """Crear una nueva regla para un cliente"""
    # Verificar que el cliente exista
    client = db.query(Client).filter(Client.id == client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")

    # Si es regla por defecto, desactivar otras reglas por defecto
    if rule.is_default:
        db.query(Rule).filter(Rule.client_id == client_id).filter(Rule.is_default == True).update(
            {"is_default": False}
        )

    # Crear la regla
    db_rule = Rule(
        client_id=client_id,
        name=rule.name,
        response=rule.response,
        priority=rule.priority,
        is_active=rule.is_active,
        is_default=rule.is_default
    )
    db.add(db_rule)
    db.flush()  # Para obtener el ID

    # Crear/asociar keywords
    for keyword_text in rule.keywords:
        keyword_text = keyword_text.strip().lower()
        if not keyword_text:
            continue

        # Buscar keyword existente o crear nueva
        keyword = db.query(Keyword).filter(Keyword.word == keyword_text).first()
        if not keyword:
            keyword = Keyword(word=keyword_text)
            db.add(keyword)
            db.flush()

        db_rule.keywords.append(keyword)

    db.commit()
    db.refresh(db_rule)
    return db_rule


@router.get("/clients/{client_id}/rules", response_model=List[RuleSchema])
def list_rules(client_id: int, db: Session = Depends(get_db)):
    """Listar todas las reglas de un cliente"""
    rules = (
        db.query(Rule)
        .filter(Rule.client_id == client_id)
        .order_by(Rule.priority.desc(), Rule.name)
        .all()
    )
    return rules


@router.get("/clients/{client_id}/rules/{rule_id}", response_model=RuleSchema)
def get_rule(client_id: int, rule_id: int, db: Session = Depends(get_db)):
    """Obtener una regla por ID"""
    rule = db.query(Rule).filter(Rule.id == rule_id).filter(Rule.client_id == client_id).first()
    if not rule:
        raise HTTPException(status_code=404, detail="Regla no encontrada")
    return rule


@router.put("/clients/{client_id}/rules/{rule_id}", response_model=RuleSchema)
def update_rule(client_id: int, rule_id: int, rule_update: RuleUpdate, db: Session = Depends(get_db)):
    """Actualizar una regla"""
    rule = db.query(Rule).filter(Rule.id == rule_id).filter(Rule.client_id == client_id).first()
    if not rule:
        raise HTTPException(status_code=404, detail="Regla no encontrada")

    if rule_update.name is not None:
        rule.name = rule_update.name
    if rule_update.response is not None:
        rule.response = rule_update.response
    if rule_update.priority is not None:
        rule.priority = rule_update.priority
    if rule_update.is_active is not None:
        rule.is_active = rule_update.is_active
    if rule_update.is_default is not None:
        if rule_update.is_default:
            # Desactivar otras reglas por defecto
            db.query(Rule).filter(Rule.client_id == client_id).filter(Rule.is_default == True).update(
                {"is_default": False}
            )
        rule.is_default = rule_update.is_default

    # Actualizar keywords si se proporcionan
    if rule_update.keywords is not None:
        rule.keywords = []
        for keyword_text in rule_update.keywords:
            keyword_text = keyword_text.strip().lower()
            if not keyword_text:
                continue

            keyword = db.query(Keyword).filter(Keyword.word == keyword_text).first()
            if not keyword:
                keyword = Keyword(word=keyword_text)
                db.add(keyword)
                db.flush()

            rule.keywords.append(keyword)

    db.commit()
    db.refresh(rule)
    return rule


@router.delete("/clients/{client_id}/rules/{rule_id}")
def delete_rule(client_id: int, rule_id: int, db: Session = Depends(get_db)):
    """Eliminar una regla"""
    rule = db.query(Rule).filter(Rule.id == rule_id).filter(Rule.client_id == client_id).first()
    if not rule:
        raise HTTPException(status_code=404, detail="Regla no encontrada")

    db.delete(rule)
    db.commit()
    return {"message": "Regla eliminada"}


# ============ CONVERSATIONS ============

@router.get("/clients/{client_id}/conversations", response_model=List[ConversationSchema])
def list_conversations(
    client_id: int,
    status: Optional[str] = None,
    limit: int = Query(50, le=100),
    offset: int = 0,
    db: Session = Depends(get_db)
):
    """Listar conversaciones de un cliente"""
    query = db.query(Conversation).filter(Conversation.client_id == client_id)

    if status:
        query = query.filter(Conversation.status == status)

    conversations = (
        query
        .order_by(Conversation.started_at.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )
    return conversations


@router.get("/clients/{client_id}/conversations/{conversation_id}", response_model=ConversationSchema)
def get_conversation(client_id: int, conversation_id: int, db: Session = Depends(get_db)):
    """Obtener una conversación con todos sus mensajes"""
    conversation = (
        db.query(Conversation)
        .filter(Conversation.id == conversation_id)
        .filter(Conversation.client_id == client_id)
        .first()
    )
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversación no encontrada")
    return conversation


# ============ DASHBOARD ============

@router.get("/clients/{client_id}/dashboard", response_model=DashboardStats)
def get_dashboard_stats(client_id: int, db: Session = Depends(get_db)):
    """Obtener estadísticas para el dashboard"""
    today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)

    # Totales
    total_conversations = db.query(Conversation).filter(Conversation.client_id == client_id).count()
    total_messages = (
        db.query(Message)
        .join(Conversation)
        .filter(Conversation.client_id == client_id)
        .count()
    )
    total_rules = db.query(Rule).filter(Rule.client_id == client_id).count()

    # Hoy
    conversations_today = (
        db.query(Conversation)
        .filter(Conversation.client_id == client_id)
        .filter(Conversation.started_at >= today)
        .count()
    )
    messages_today = (
        db.query(Message)
        .join(Conversation)
        .filter(Conversation.client_id == client_id)
        .filter(Message.created_at >= today)
        .count()
    )

    # Top reglas más usadas
    top_rules = (
        db.query(Rule.name, func.count(Message.id).label('count'))
        .join(Message, Message.rule_id == Rule.id)
        .filter(Rule.client_id == client_id)
        .group_by(Rule.id)
        .order_by(func.count(Message.id).desc())
        .limit(5)
        .all()
    )

    return DashboardStats(
        total_conversations=total_conversations,
        total_messages=total_messages,
        total_rules=total_rules,
        conversations_today=conversations_today,
        messages_today=messages_today,
        top_rules=[{"name": r[0], "count": r[1]} for r in top_rules]
    )
