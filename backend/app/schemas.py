from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


# ============ Keywords ============
class KeywordBase(BaseModel):
    word: str


class KeywordCreate(KeywordBase):
    pass


class Keyword(KeywordBase):
    id: int

    class Config:
        from_attributes = True


# ============ Rules ============
class RuleBase(BaseModel):
    name: str
    response: str
    priority: int = 0
    is_active: bool = True
    is_default: bool = False


class RuleCreate(RuleBase):
    keywords: List[str] = []  # Lista de palabras clave


class RuleUpdate(BaseModel):
    name: Optional[str] = None
    response: Optional[str] = None
    priority: Optional[int] = None
    is_active: Optional[bool] = None
    is_default: Optional[bool] = None
    keywords: Optional[List[str]] = None


class Rule(RuleBase):
    id: int
    client_id: int
    keywords: List[Keyword] = []
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ============ Clients ============
class ClientBase(BaseModel):
    name: str
    slug: str


class ClientCreate(ClientBase):
    pass


class ClientUpdate(BaseModel):
    name: Optional[str] = None
    is_active: Optional[bool] = None


class Client(ClientBase):
    id: int
    api_key: str
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ClientWithStats(Client):
    total_rules: int = 0
    total_conversations: int = 0
    total_messages: int = 0


# ============ Messages ============
class MessageBase(BaseModel):
    content: str
    sender_type: str  # "user" o "bot"


class MessageCreate(BaseModel):
    content: str


class Message(MessageBase):
    id: int
    conversation_id: int
    rule_id: Optional[int] = None
    created_at: datetime

    class Config:
        from_attributes = True


# ============ Conversations ============
class ConversationBase(BaseModel):
    session_id: str
    channel: str = "webchat"


class ConversationCreate(BaseModel):
    visitor_name: Optional[str] = None
    visitor_email: Optional[str] = None


class Conversation(ConversationBase):
    id: int
    client_id: int
    visitor_name: Optional[str] = None
    visitor_email: Optional[str] = None
    status: str
    started_at: datetime
    ended_at: Optional[datetime] = None
    messages: List[Message] = []

    class Config:
        from_attributes = True


# ============ Chat ============
class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None
    visitor_name: Optional[str] = None


class ChatResponse(BaseModel):
    response: str
    session_id: str
    conversation_id: int
    matched_rule: Optional[str] = None


# ============ Dashboard Stats ============
class DashboardStats(BaseModel):
    total_conversations: int
    total_messages: int
    total_rules: int
    conversations_today: int
    messages_today: int
    top_rules: List[dict] = []
