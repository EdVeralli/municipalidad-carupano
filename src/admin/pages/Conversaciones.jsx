import { useState, useEffect } from 'react';
import { MessageSquare, X, User, Bot } from 'lucide-react';
import { getConversations, getConversation } from '../api';
import '../components/AdminLayout.css';

const Conversaciones = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const data = await getConversations();
      setConversations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const viewConversation = async (conversation) => {
    try {
      setLoadingMessages(true);
      setSelectedConversation(conversation);
      const data = await getConversation(conversation.id);
      setMessages(data.messages || []);
    } catch (err) {
      alert('Error al cargar mensajes: ' + err.message);
    } finally {
      setLoadingMessages(false);
    }
  };

  const closeDetail = () => {
    setSelectedConversation(null);
    setMessages([]);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-VE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="admin-card">
        <p style={{ color: '#dc2626' }}>Error: {error}</p>
        <button className="admin-btn admin-btn-primary" onClick={loadConversations}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-page-header">
        <h1>Conversaciones</h1>
        <p>Historial de chats con los usuarios</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selectedConversation ? '1fr 1fr' : '1fr', gap: 24 }}>
        {/* Lista de conversaciones */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3>{conversations.length} conversaciones</h3>
          </div>

          {conversations.length > 0 ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Session ID</th>
                  <th>Canal</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {conversations.map((conv) => (
                  <tr
                    key={conv.id}
                    style={{
                      cursor: 'pointer',
                      backgroundColor: selectedConversation?.id === conv.id ? '#f1f5f9' : undefined
                    }}
                    onClick={() => viewConversation(conv)}
                  >
                    <td>
                      <code style={{ fontSize: '0.75rem' }}>
                        {conv.session_id.substring(0, 8)}...
                      </code>
                    </td>
                    <td>
                      <span className="badge badge-info">{conv.channel}</span>
                    </td>
                    <td>
                      <span className={`badge ${conv.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                        {conv.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8rem' }}>{formatDate(conv.started_at)}</td>
                    <td>
                      <button className="admin-btn admin-btn-secondary admin-btn-sm">
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <MessageSquare size={48} />
              <h4>No hay conversaciones</h4>
              <p>Las conversaciones apareceran cuando los usuarios usen el chat</p>
            </div>
          )}
        </div>

        {/* Detalle de conversacion */}
        {selectedConversation && (
          <div className="admin-card" style={{ position: 'sticky', top: 24, maxHeight: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
            <div className="admin-card-header">
              <h3>Conversacion</h3>
              <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={closeDetail}>
                <X size={16} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0' }}>
              {loadingMessages ? (
                <div className="loading">Cargando mensajes...</div>
              ) : messages.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      style={{
                        display: 'flex',
                        gap: 10,
                        flexDirection: msg.sender_type === 'user' ? 'row-reverse' : 'row',
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: msg.sender_type === 'user' ? '#fbbf24' : '#3b82f6',
                          color: msg.sender_type === 'user' ? '#1e293b' : 'white',
                          flexShrink: 0
                        }}
                      >
                        {msg.sender_type === 'user' ? <User size={16} /> : <Bot size={16} />}
                      </div>
                      <div
                        style={{
                          maxWidth: '75%',
                          padding: '10px 14px',
                          borderRadius: 12,
                          backgroundColor: msg.sender_type === 'user' ? '#3b82f6' : '#f1f5f9',
                          color: msg.sender_type === 'user' ? 'white' : '#1e293b',
                          fontSize: '0.875rem',
                          lineHeight: 1.5
                        }}
                      >
                        {msg.content.split('\n').map((line, i) => (
                          <span key={i}>
                            {line}
                            {i < msg.content.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                        <div
                          style={{
                            fontSize: '0.7rem',
                            opacity: 0.7,
                            marginTop: 4,
                            textAlign: msg.sender_type === 'user' ? 'right' : 'left'
                          }}
                        >
                          {formatDate(msg.created_at)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>No hay mensajes</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Conversaciones;
