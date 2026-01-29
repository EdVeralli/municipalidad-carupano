from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base

# Tabla de asociación entre reglas y palabras clave
rule_keywords = Table(
    'rule_keywords',
    Base.metadata,
    Column('rule_id', Integer, ForeignKey('rules.id'), primary_key=True),
    Column('keyword_id', Integer, ForeignKey('keywords.id'), primary_key=True)
)


class Client(Base):
    """Representa un cliente/organización que usa el chatbot"""
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    slug = Column(String(100), unique=True, index=True, nullable=False)  # ej: "municipalidad-carupano"
    api_key = Column(String(64), unique=True, index=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relaciones
    rules = relationship("Rule", back_populates="client", cascade="all, delete-orphan")
    conversations = relationship("Conversation", back_populates="client", cascade="all, delete-orphan")


class Rule(Base):
    """Regla de respuesta del chatbot"""
    __tablename__ = "rules"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"), nullable=False)
    name = Column(String(255), nullable=False)  # Nombre descriptivo de la regla
    response = Column(Text, nullable=False)  # Respuesta que dará el bot
    priority = Column(Integer, default=0)  # Mayor prioridad = se evalúa primero
    is_active = Column(Boolean, default=True)
    is_default = Column(Boolean, default=False)  # Respuesta por defecto si no hay match
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relaciones
    client = relationship("Client", back_populates="rules")
    keywords = relationship("Keyword", secondary=rule_keywords, back_populates="rules")


class Keyword(Base):
    """Palabras clave que activan una regla"""
    __tablename__ = "keywords"

    id = Column(Integer, primary_key=True, index=True)
    word = Column(String(100), nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relaciones
    rules = relationship("Rule", secondary=rule_keywords, back_populates="keywords")


class Conversation(Base):
    """Una conversación de chat"""
    __tablename__ = "conversations"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"), nullable=False)
    session_id = Column(String(64), index=True, nullable=False)  # ID único del visitante
    visitor_name = Column(String(255), nullable=True)
    visitor_email = Column(String(255), nullable=True)
    channel = Column(String(50), default="webchat")  # webchat, whatsapp, etc.
    status = Column(String(20), default="active")  # active, closed, transferred
    started_at = Column(DateTime(timezone=True), server_default=func.now())
    ended_at = Column(DateTime(timezone=True), nullable=True)

    # Relaciones
    client = relationship("Client", back_populates="conversations")
    messages = relationship("Message", back_populates="conversation", cascade="all, delete-orphan")


class Message(Base):
    """Mensaje individual en una conversación"""
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    conversation_id = Column(Integer, ForeignKey("conversations.id"), nullable=False)
    sender_type = Column(String(20), nullable=False)  # "user" o "bot"
    content = Column(Text, nullable=False)
    rule_id = Column(Integer, ForeignKey("rules.id"), nullable=True)  # Qué regla se usó para responder
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relaciones
    conversation = relationship("Conversation", back_populates="messages")
