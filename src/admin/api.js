// API client para el panel de administracion
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const CLIENT_ID = 1; // ID del cliente (Municipalidad de Carupano)

// Helper para hacer requests
async function request(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Error desconocido' }));
    throw new Error(error.detail || 'Error en la solicitud');
  }

  return response.json();
}

// Dashboard
export const getDashboard = () => request(`/admin/clients/${CLIENT_ID}/dashboard`);

// Reglas
export const getRules = () => request(`/admin/clients/${CLIENT_ID}/rules`);

export const getRule = (ruleId) => request(`/admin/clients/${CLIENT_ID}/rules/${ruleId}`);

export const createRule = (data) => request(`/admin/clients/${CLIENT_ID}/rules`, {
  method: 'POST',
  body: JSON.stringify(data),
});

export const updateRule = (ruleId, data) => request(`/admin/clients/${CLIENT_ID}/rules/${ruleId}`, {
  method: 'PUT',
  body: JSON.stringify(data),
});

export const deleteRule = (ruleId) => request(`/admin/clients/${CLIENT_ID}/rules/${ruleId}`, {
  method: 'DELETE',
});

// Conversaciones
export const getConversations = (limit = 50) =>
  request(`/admin/clients/${CLIENT_ID}/conversations?limit=${limit}`);

export const getConversation = (conversationId) =>
  request(`/admin/clients/${CLIENT_ID}/conversations/${conversationId}`);

export const deleteConversation = (conversationId) =>
  request(`/admin/clients/${CLIENT_ID}/conversations/${conversationId}`, {
    method: 'DELETE',
  });

export const deleteAllConversations = () =>
  request(`/admin/clients/${CLIENT_ID}/conversations`, {
    method: 'DELETE',
  });
