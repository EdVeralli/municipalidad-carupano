from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from typing import Optional

from ..database import get_db
from ..models import Client
from ..schemas import ChatRequest, ChatResponse
from ..services import ChatbotService

router = APIRouter(prefix="/chat", tags=["Chat"])


def get_client_by_slug(slug: str, db: Session) -> Client:
    """Obtiene el cliente por su slug"""
    client = db.query(Client).filter(Client.slug == slug).filter(Client.is_active == True).first()
    if not client:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return client


@router.post("/{client_slug}", response_model=ChatResponse)
def send_message(
    client_slug: str,
    request: ChatRequest,
    db: Session = Depends(get_db)
):
    """
    Endpoint principal del chat.
    Recibe un mensaje del usuario y retorna la respuesta del bot.
    """
    client = get_client_by_slug(client_slug, db)

    chatbot = ChatbotService(db, client.id)
    result = chatbot.process_message(
        message=request.message,
        session_id=request.session_id,
        visitor_name=request.visitor_name
    )

    return ChatResponse(**result)


@router.get("/{client_slug}/history/{session_id}")
def get_history(
    client_slug: str,
    session_id: str,
    db: Session = Depends(get_db)
):
    """Obtiene el historial de una conversación"""
    client = get_client_by_slug(client_slug, db)

    chatbot = ChatbotService(db, client.id)
    history = chatbot.get_conversation_history(session_id)

    return {"messages": history}


@router.get("/{client_slug}/config")
def get_chat_config(
    client_slug: str,
    db: Session = Depends(get_db)
):
    """
    Retorna la configuración del chat para el widget.
    Útil para personalizar el widget desde el backend.
    """
    client = get_client_by_slug(client_slug, db)

    return {
        "client_name": client.name,
        "client_slug": client.slug,
        "welcome_message": f"¡Hola! Soy el asistente virtual de {client.name}. ¿En qué puedo ayudarte?"
    }
