import unicodedata
import uuid
from typing import Optional, Tuple
from sqlalchemy.orm import Session
from sqlalchemy import func
from ..models import Rule, Keyword, Conversation, Message, Client


class ChatbotService:
    """Servicio principal del chatbot - maneja la lógica de matching de reglas"""

    def __init__(self, db: Session, client_id: int):
        self.db = db
        self.client_id = client_id

    def normalize_text(self, text: str) -> str:
        """Normaliza el texto: minúsculas, sin acentos, sin caracteres especiales"""
        # Convertir a minúsculas
        text = text.lower()
        # Remover acentos
        text = unicodedata.normalize('NFD', text)
        text = ''.join(char for char in text if unicodedata.category(char) != 'Mn')
        return text

    def find_matching_rule(self, message: str) -> Optional[Rule]:
        """
        Busca una regla que coincida con el mensaje del usuario.
        Retorna la regla con mayor prioridad que tenga al menos una keyword que coincida.
        """
        normalized_message = self.normalize_text(message)

        # Obtener todas las reglas activas del cliente, ordenadas por prioridad
        rules = (
            self.db.query(Rule)
            .filter(Rule.client_id == self.client_id)
            .filter(Rule.is_active == True)
            .filter(Rule.is_default == False)
            .order_by(Rule.priority.desc())
            .all()
        )

        # Buscar coincidencias
        for rule in rules:
            for keyword in rule.keywords:
                normalized_keyword = self.normalize_text(keyword.word)
                if normalized_keyword in normalized_message:
                    return rule

        # Si no hay coincidencia, buscar la regla por defecto
        default_rule = (
            self.db.query(Rule)
            .filter(Rule.client_id == self.client_id)
            .filter(Rule.is_active == True)
            .filter(Rule.is_default == True)
            .first()
        )

        return default_rule

    def get_or_create_conversation(
        self,
        session_id: Optional[str] = None,
        visitor_name: Optional[str] = None,
        visitor_email: Optional[str] = None
    ) -> Tuple[Conversation, bool]:
        """
        Obtiene una conversación existente o crea una nueva.
        Retorna (conversation, is_new)
        """
        if session_id:
            # Buscar conversación activa existente
            conversation = (
                self.db.query(Conversation)
                .filter(Conversation.client_id == self.client_id)
                .filter(Conversation.session_id == session_id)
                .filter(Conversation.status == "active")
                .first()
            )
            if conversation:
                return conversation, False

        # Crear nueva conversación
        new_session_id = session_id or str(uuid.uuid4())
        conversation = Conversation(
            client_id=self.client_id,
            session_id=new_session_id,
            visitor_name=visitor_name,
            visitor_email=visitor_email,
            channel="webchat"
        )
        self.db.add(conversation)
        self.db.commit()
        self.db.refresh(conversation)
        return conversation, True

    def process_message(
        self,
        message: str,
        session_id: Optional[str] = None,
        visitor_name: Optional[str] = None
    ) -> dict:
        """
        Procesa un mensaje del usuario y retorna la respuesta del bot.
        """
        # Obtener o crear conversación
        conversation, is_new = self.get_or_create_conversation(
            session_id=session_id,
            visitor_name=visitor_name
        )

        # Guardar mensaje del usuario
        user_message = Message(
            conversation_id=conversation.id,
            sender_type="user",
            content=message
        )
        self.db.add(user_message)

        # Buscar regla que coincida
        matched_rule = self.find_matching_rule(message)

        # Generar respuesta
        if matched_rule:
            response_text = matched_rule.response
            rule_id = matched_rule.id
            rule_name = matched_rule.name
        else:
            response_text = "Lo siento, no tengo información sobre eso. ¿Puedo ayudarte con algo más?"
            rule_id = None
            rule_name = None

        # Guardar respuesta del bot
        bot_message = Message(
            conversation_id=conversation.id,
            sender_type="bot",
            content=response_text,
            rule_id=rule_id
        )
        self.db.add(bot_message)
        self.db.commit()

        return {
            "response": response_text,
            "session_id": conversation.session_id,
            "conversation_id": conversation.id,
            "matched_rule": rule_name
        }

    def get_conversation_history(self, session_id: str) -> list:
        """Obtiene el historial de mensajes de una conversación"""
        conversation = (
            self.db.query(Conversation)
            .filter(Conversation.client_id == self.client_id)
            .filter(Conversation.session_id == session_id)
            .first()
        )

        if not conversation:
            return []

        messages = (
            self.db.query(Message)
            .filter(Message.conversation_id == conversation.id)
            .order_by(Message.created_at.asc())
            .all()
        )

        return [
            {
                "id": msg.id,
                "sender_type": msg.sender_type,
                "content": msg.content,
                "created_at": msg.created_at.isoformat()
            }
            for msg in messages
        ]
