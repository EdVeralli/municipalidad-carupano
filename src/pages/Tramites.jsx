import {
  FileText, Building2, Home, Car, Users, Briefcase,
  ClipboardList, Clock, DollarSign, CheckCircle, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './Pages.css';

const Tramites = () => {
  const tramites = [
    {
      icon: <FileText size={24} />,
      title: 'Solvencia Municipal',
      requisitos: ['Cédula de identidad', 'RIF actualizado', 'Último recibo de impuestos', 'Planilla de solicitud'],
      tiempo: '3 días hábiles',
      costo: '2 U.T.'
    },
    {
      icon: <Building2 size={24} />,
      title: 'Patente de Industria y Comercio',
      requisitos: ['Registro mercantil', 'RIF de la empresa', 'Cédula del representante', 'Contrato de arrendamiento'],
      tiempo: '5-10 días hábiles',
      costo: 'Variable'
    },
    {
      icon: <Home size={24} />,
      title: 'Permiso de Construcción',
      requisitos: ['Documento de propiedad', 'Planos firmados por ingeniero', 'Cédula y RIF', 'Variables urbanas'],
      tiempo: '15 días hábiles',
      costo: 'Según m²'
    },
    {
      icon: <Users size={24} />,
      title: 'Certificado de Residencia',
      requisitos: ['Cédula de identidad', 'Recibo de servicio público', 'Dos testigos con cédula'],
      tiempo: 'Inmediato',
      costo: 'Gratuito'
    },
    {
      icon: <Car size={24} />,
      title: 'Impuesto de Vehículos',
      requisitos: ['Cédula del propietario', 'Título del vehículo', 'Último pago de impuesto'],
      tiempo: 'Inmediato',
      costo: 'Según vehículo'
    },
    {
      icon: <Briefcase size={24} />,
      title: 'Constancia de No Poseer Vivienda',
      requisitos: ['Cédula de identidad', 'Constancia de trabajo', 'Declaración jurada'],
      tiempo: '5 días hábiles',
      costo: '1 U.T.'
    }
  ];

  return (
    <main className="page-content">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <h1>Trámites Municipales</h1>
          <p>Toda la información que necesitas para realizar tus gestiones</p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="section-padding">
        <div className="container">
          <div className="info-cards">
            <div className="info-card">
              <Clock size={32} />
              <div>
                <h4>Horario de Atención</h4>
                <p>Lunes a Viernes: 8:00 AM - 3:00 PM</p>
              </div>
            </div>
            <div className="info-card">
              <DollarSign size={32} />
              <div>
                <h4>Formas de Pago</h4>
                <p>Efectivo, Transferencia, Punto de venta</p>
              </div>
            </div>
            <div className="info-card">
              <ClipboardList size={32} />
              <div>
                <h4>Requisitos Generales</h4>
                <p>Cédula vigente en todos los trámites</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tramites List */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="section-title">
            <h2>Trámites Disponibles</h2>
            <p>Selecciona el trámite que necesitas para ver los requisitos</p>
          </div>

          <div className="tramites-grid">
            {tramites.map((tramite, index) => (
              <div key={index} className="tramite-card card">
                <div className="tramite-header">
                  <div className="tramite-icon">{tramite.icon}</div>
                  <h3>{tramite.title}</h3>
                </div>
                <div className="tramite-body">
                  <h4>Requisitos:</h4>
                  <ul>
                    {tramite.requisitos.map((req, i) => (
                      <li key={i}>
                        <CheckCircle size={14} /> {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="tramite-footer">
                  <span><Clock size={14} /> {tramite.tiempo}</span>
                  <span><DollarSign size={14} /> {tramite.costo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta">
        <div className="container">
          <h2>¿Tienes dudas sobre algún trámite?</h2>
          <p>Nuestro chatbot puede ayudarte con información detallada</p>
          <p className="cta-hint">Usa el botón de chat en la esquina inferior derecha</p>
        </div>
      </section>
    </main>
  );
};

export default Tramites;
