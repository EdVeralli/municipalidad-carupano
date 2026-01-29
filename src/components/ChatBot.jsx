import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2, WifiOff } from 'lucide-react';
import './ChatBot.css';

// Configuracion del backend
const API_URL = 'http://localhost:8000';
const CLIENT_SLUG = 'municipalidad-carupano';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: '¡Hola! Soy el asistente virtual de la Municipalidad de Carúpano. ¿En qué puedo ayudarte hoy?',
      time: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [isOnline, setIsOnline] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Verificar conexion con el backend al abrir el chat
  useEffect(() => {
    if (isOpen) {
      fetch(`${API_URL}/health`)
        .then(res => res.ok ? setIsOnline(true) : setIsOnline(false))
        .catch(() => setIsOnline(false));
    }
  }, [isOpen]);

  const sendMessageToBackend = async (message) => {
    try {
      const response = await fetch(`${API_URL}/chat/${CLIENT_SLUG}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          session_id: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();

      // Guardar session_id para mantener la conversacion
      if (data.session_id && !sessionId) {
        setSessionId(data.session_id);
      }

      return data.response;
    } catch (error) {
      console.error('Error al comunicarse con el backend:', error);
      setIsOnline(false);
      return 'Lo siento, hay un problema de conexión. Por favor, intenta de nuevo más tarde.';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const messageText = inputValue;

    // Agregar mensaje del usuario
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: messageText,
      time: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Enviar al backend y obtener respuesta
    const botResponse = await sendMessageToBackend(messageText);

    const botMessage = {
      id: Date.now() + 1,
      type: 'bot',
      text: botResponse,
      time: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleQuickAction = (action) => {
    setInputValue(action);
    setTimeout(() => {
      const form = document.querySelector('.chatbot-input-form');
      if (form) {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    }, 100);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' });
  };

  const quickActions = [
    'Horarios de atención',
    'Trámites disponibles',
    'Ubicación',
    'Turismo'
  ];

  return (
    <div className="chatbot-container">
      {/* Chat Window */}
      {isOpen && (
        <div className={`chatbot-window ${isMinimized ? 'minimized' : ''}`}>
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <Bot size={24} />
              </div>
              <div>
                <h4>Asistente Municipal</h4>
                <span className={isOnline ? "status-online" : "status-offline"}>
                  {isOnline ? 'En línea' : 'Sin conexión'}
                </span>
              </div>
            </div>
            <div className="chatbot-header-actions">
              <button onClick={() => setIsMinimized(!isMinimized)} title="Minimizar">
                <Minimize2 size={18} />
              </button>
              <button onClick={() => setIsOpen(false)} title="Cerrar">
                <X size={18} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Offline Banner */}
              {!isOnline && (
                <div className="offline-banner">
                  <WifiOff size={16} />
                  <span>Conexión perdida con el servidor</span>
                </div>
              )}

              {/* Messages */}
              <div className="chatbot-messages">
                {messages.map((message) => (
                  <div key={message.id} className={`message ${message.type}`}>
                    <div className="message-avatar">
                      {message.type === 'bot' ? <Bot size={16} /> : <User size={16} />}
                    </div>
                    <div className="message-content">
                      <div className="message-bubble">
                        {message.text.split('\n').map((line, i) => (
                          <span key={i}>
                            {line}
                            {i < message.text.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </div>
                      <span className="message-time">{formatTime(message.time)}</span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="message bot">
                    <div className="message-avatar">
                      <Bot size={16} />
                    </div>
                    <div className="message-content">
                      <div className="message-bubble typing">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {messages.length <= 2 && (
                <div className="quick-actions">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      className="quick-action-btn"
                      onClick={() => handleQuickAction(action)}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <form className="chatbot-input-form" onSubmit={handleSubmit}>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Escribe tu mensaje..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit" disabled={!inputValue.trim() || isTyping}>
                  <Send size={20} />
                </button>
              </form>
            </>
          )}
        </div>
      )}

      {/* Toggle Button */}
      <button
        className={`chatbot-toggle ${isOpen ? 'active' : ''}`}
        onClick={() => {
          setIsOpen(!isOpen);
          setIsMinimized(false);
        }}
        aria-label="Abrir chat"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        {!isOpen && <span className="chat-badge">1</span>}
      </button>
    </div>
  );
};

export default ChatBot;
