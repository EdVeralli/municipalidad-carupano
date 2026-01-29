import { useState, useEffect } from 'react';
import { MessageSquare, Users, List, TrendingUp } from 'lucide-react';
import { getDashboard } from '../api';
import '../components/AdminLayout.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const data = await getDashboard();
      setStats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="admin-card">
        <p style={{ color: '#dc2626' }}>Error: {error}</p>
        <button className="admin-btn admin-btn-primary" onClick={loadDashboard}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-page-header">
        <h1>Dashboard</h1>
        <p>Resumen de actividad del chatbot</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-icon blue">
            <MessageSquare size={24} />
          </div>
          <h4>Conversaciones</h4>
          <div className="stat-value">{stats.total_conversations}</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon green">
            <TrendingUp size={24} />
          </div>
          <h4>Mensajes Totales</h4>
          <div className="stat-value">{stats.total_messages}</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon purple">
            <List size={24} />
          </div>
          <h4>Reglas Activas</h4>
          <div className="stat-value">{stats.total_rules}</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon orange">
            <Users size={24} />
          </div>
          <h4>Conversaciones Hoy</h4>
          <div className="stat-value">{stats.conversations_today}</div>
        </div>
      </div>

      {/* Top Rules */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Reglas mas utilizadas</h3>
        </div>
        {stats.top_rules && stats.top_rules.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Regla</th>
                <th>Veces usada</th>
              </tr>
            </thead>
            <tbody>
              {stats.top_rules.map((rule, index) => (
                <tr key={index}>
                  <td>{rule.name}</td>
                  <td>
                    <span className="badge badge-info">{rule.count}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <MessageSquare size={48} />
            <h4>Sin datos aun</h4>
            <p>Las estadisticas apareceran cuando haya conversaciones</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
