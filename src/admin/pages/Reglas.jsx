import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, List } from 'lucide-react';
import { getRules, createRule, updateRule, deleteRule } from '../api';
import '../components/AdminLayout.css';

const Reglas = () => {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    response: '',
    keywords: [],
    priority: 0,
    is_active: true,
    is_default: false,
  });
  const [keywordInput, setKeywordInput] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadRules();
  }, []);

  const loadRules = async () => {
    try {
      setLoading(true);
      const data = await getRules();
      setRules(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingRule(null);
    setFormData({
      name: '',
      response: '',
      keywords: [],
      priority: 0,
      is_active: true,
      is_default: false,
    });
    setKeywordInput('');
    setShowModal(true);
  };

  const openEditModal = (rule) => {
    setEditingRule(rule);
    setFormData({
      name: rule.name,
      response: rule.response,
      keywords: rule.keywords.map(k => k.word),
      priority: rule.priority,
      is_active: rule.is_active,
      is_default: rule.is_default,
    });
    setKeywordInput('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingRule(null);
  };

  const handleAddKeyword = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const keyword = keywordInput.trim().toLowerCase();
      if (keyword && !formData.keywords.includes(keyword)) {
        setFormData({ ...formData, keywords: [...formData.keywords, keyword] });
      }
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (keyword) => {
    setFormData({
      ...formData,
      keywords: formData.keywords.filter(k => k !== keyword)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (editingRule) {
        await updateRule(editingRule.id, formData);
      } else {
        await createRule(formData);
      }
      closeModal();
      loadRules();
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (rule) => {
    if (!confirm(`¿Eliminar la regla "${rule.name}"?`)) return;
    try {
      await deleteRule(rule.id);
      loadRules();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div>
      <div className="admin-page-header">
        <h1>Reglas del Chatbot</h1>
        <p>Configura las respuestas automaticas del bot</p>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h3>{rules.length} reglas configuradas</h3>
          <button className="admin-btn admin-btn-primary" onClick={openCreateModal}>
            <Plus size={18} /> Nueva Regla
          </button>
        </div>

        {rules.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Keywords</th>
                <th>Prioridad</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((rule) => (
                <tr key={rule.id}>
                  <td>
                    <strong>{rule.name}</strong>
                    {rule.is_default && (
                      <span className="badge badge-warning" style={{ marginLeft: 8 }}>
                        Default
                      </span>
                    )}
                  </td>
                  <td>
                    {rule.keywords.slice(0, 3).map(k => k.word).join(', ')}
                    {rule.keywords.length > 3 && ` +${rule.keywords.length - 3}`}
                  </td>
                  <td>{rule.priority}</td>
                  <td>
                    <span className={`badge ${rule.is_active ? 'badge-success' : 'badge-warning'}`}>
                      {rule.is_active ? 'Activa' : 'Inactiva'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                        onClick={() => openEditModal(rule)}
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        className="admin-btn admin-btn-danger admin-btn-sm"
                        onClick={() => handleDelete(rule)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <List size={48} />
            <h4>No hay reglas</h4>
            <p>Crea tu primera regla para que el bot pueda responder</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingRule ? 'Editar Regla' : 'Nueva Regla'}</h3>
              <button className="modal-close" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Nombre de la regla</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej: Horarios de atencion"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Palabras clave (presiona Enter para agregar)</label>
                  <div className="keywords-input">
                    {formData.keywords.map((keyword, i) => (
                      <span key={i} className="keyword-tag">
                        {keyword}
                        <button type="button" onClick={() => handleRemoveKeyword(keyword)}>
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={keywordInput}
                      onChange={e => setKeywordInput(e.target.value)}
                      onKeyDown={handleAddKeyword}
                      placeholder="Escribe y presiona Enter..."
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Respuesta del bot</label>
                  <textarea
                    className="form-control"
                    value={formData.response}
                    onChange={e => setFormData({ ...formData, response: e.target.value })}
                    placeholder="Escribe la respuesta que dara el bot..."
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div className="form-group">
                    <label>Prioridad</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.priority}
                      onChange={e => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })}
                      min="0"
                      max="100"
                    />
                  </div>

                  <div className="form-group">
                    <label>Estado</label>
                    <select
                      className="form-control"
                      value={formData.is_active ? 'active' : 'inactive'}
                      onChange={e => setFormData({ ...formData, is_active: e.target.value === 'active' })}
                    >
                      <option value="active">Activa</option>
                      <option value="inactive">Inactiva</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input
                      type="checkbox"
                      checked={formData.is_default}
                      onChange={e => setFormData({ ...formData, is_default: e.target.checked })}
                    />
                    Usar como respuesta por defecto
                  </label>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                  {saving ? 'Guardando...' : (editingRule ? 'Actualizar' : 'Crear')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reglas;
