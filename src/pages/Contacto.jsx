import { useState } from 'react';
import {
  MapPin, Phone, Mail, Clock, Send,
  Facebook, Twitter, Instagram, Youtube,
  MessageCircle, CheckCircle
} from 'lucide-react';
import './Pages.css';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de envío
    setEnviado(true);
    setTimeout(() => {
      setEnviado(false);
      setFormData({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <MapPin size={24} />,
      titulo: 'Dirección',
      lineas: ['Calle Independencia, frente a Plaza Colón', 'Carúpano, Estado Sucre', 'Venezuela']
    },
    {
      icon: <Phone size={24} />,
      titulo: 'Teléfonos',
      lineas: ['(0294) 331-XXXX', '0800-ALCALDIA', 'WhatsApp: 0414-XXX-XXXX']
    },
    {
      icon: <Mail size={24} />,
      titulo: 'Correo Electrónico',
      lineas: ['alcaldia@carupano.gob.ve', 'atencion@carupano.gob.ve', 'reclamos@carupano.gob.ve']
    },
    {
      icon: <Clock size={24} />,
      titulo: 'Horario de Atención',
      lineas: ['Lunes a Viernes', '8:00 AM - 4:00 PM', 'Sábados: Solo emergencias']
    }
  ];

  return (
    <main className="page-content">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <h1>Contacto</h1>
          <p>Estamos aquí para atenderte. Contáctanos por cualquier medio</p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="section-padding">
        <div className="container">
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-info-card card">
                <div className="contact-info-icon">{info.icon}</div>
                <h4>{info.titulo}</h4>
                {info.lineas.map((linea, i) => (
                  <p key={i}>{linea}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form and Map */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="contact-grid">
            {/* Formulario */}
            <div className="contact-form-container card">
              <h3>Envíanos un mensaje</h3>
              <p>Completa el formulario y te responderemos a la brevedad</p>

              {enviado ? (
                <div className="form-success">
                  <CheckCircle size={48} />
                  <h4>¡Mensaje enviado!</h4>
                  <p>Gracias por contactarnos. Te responderemos pronto.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="nombre">Nombre completo *</label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Correo electrónico *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="telefono">Teléfono</label>
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="0412-XXX-XXXX"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="asunto">Asunto *</label>
                      <select
                        id="asunto"
                        name="asunto"
                        value={formData.asunto}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Selecciona un asunto</option>
                        <option value="consulta">Consulta general</option>
                        <option value="tramite">Información de trámites</option>
                        <option value="queja">Queja o reclamo</option>
                        <option value="sugerencia">Sugerencia</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="mensaje">Mensaje *</label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      required
                      rows="5"
                      placeholder="Escribe tu mensaje aquí..."
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    <Send size={18} /> Enviar mensaje
                  </button>
                </form>
              )}
            </div>

            {/* Info adicional */}
            <div className="contact-sidebar">
              <div className="sidebar-card card">
                <MessageCircle size={32} />
                <h4>Asistente Virtual</h4>
                <p>
                  ¿Necesitas respuestas rápidas? Nuestro chatbot está disponible
                  24/7 para ayudarte con consultas sobre trámites, horarios y más.
                </p>
                <p className="sidebar-hint">
                  Haz clic en el botón de chat en la esquina inferior derecha
                </p>
              </div>

              <div className="sidebar-card card">
                <h4>Síguenos en redes</h4>
                <p>Mantente informado sobre las actividades del municipio</p>
                <div className="social-buttons">
                  <a href="#" className="social-btn facebook">
                    <Facebook size={20} />
                  </a>
                  <a href="#" className="social-btn twitter">
                    <Twitter size={20} />
                  </a>
                  <a href="#" className="social-btn instagram">
                    <Instagram size={20} />
                  </a>
                  <a href="#" className="social-btn youtube">
                    <Youtube size={20} />
                  </a>
                </div>
              </div>

              {/* Mapa placeholder */}
              <div className="map-container card">
                <div className="map-placeholder">
                  <MapPin size={40} />
                  <p>Ubicación en Google Maps</p>
                  <span>Calle Independencia, Carúpano</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contacto;
