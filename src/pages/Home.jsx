import { Link } from 'react-router-dom';
import {
  FileText, Building2, MapPin, Newspaper,
  Users, Phone, ArrowRight, CheckCircle,
  Waves, Sun, TreePalm
} from 'lucide-react';
import './Home.css';

const Home = () => {
  const services = [
    {
      icon: <FileText size={32} />,
      title: 'Trámites en Línea',
      description: 'Realiza tus gestiones municipales de forma rápida y sencilla.',
      link: '/tramites'
    },
    {
      icon: <Building2 size={32} />,
      title: 'Servicios Municipales',
      description: 'Conoce todos los servicios que ofrecemos a la comunidad.',
      link: '/servicios'
    },
    {
      icon: <MapPin size={32} />,
      title: 'Turismo',
      description: 'Descubre las maravillas de Carúpano y sus alrededores.',
      link: '/turismo'
    },
    {
      icon: <Newspaper size={32} />,
      title: 'Noticias',
      description: 'Mantente informado sobre las actividades de tu municipio.',
      link: '/noticias'
    }
  ];

  const stats = [
    { number: '150,000+', label: 'Habitantes' },
    { number: '12', label: 'Parroquias' },
    { number: '50+', label: 'Servicios' },
    { number: '24/7', label: 'Atención Digital' }
  ];

  const features = [
    'Gestión transparente y eficiente',
    'Atención ciudadana personalizada',
    'Servicios digitales modernos',
    'Compromiso con el desarrollo local'
  ];

  return (
    <main className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <div className="hero-badge">
            <Sun size={16} /> Bienvenidos a Carúpano
          </div>
          <h1>Municipalidad de Carúpano</h1>
          <p>
            Trabajamos por el bienestar y progreso de todos los carupaneros.
            Una gestión cercana, transparente y comprometida con nuestra gente.
          </p>
          <div className="hero-buttons">
            <Link to="/tramites" className="btn btn-secondary">
              <FileText size={20} /> Ver Trámites
            </Link>
            <Link to="/contacto" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
              <Phone size={20} /> Contáctanos
            </Link>
          </div>
          <div className="hero-features">
            {features.map((feature, index) => (
              <span key={index} className="hero-feature">
                <CheckCircle size={16} /> {feature}
              </span>
            ))}
          </div>
        </div>
        <div className="hero-wave">
          <Waves size={40} />
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-title">
            <h2>Nuestros Servicios</h2>
            <p>Accede a todos los servicios que la Municipalidad tiene para ti</p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <Link to={service.link} key={index} className="service-card card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="service-link">
                  Ver más <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop"
                alt="Vista de Carúpano"
              />
              <div className="about-image-overlay">
                <TreePalm size={40} />
                <span>Carúpano, Estado Sucre</span>
              </div>
            </div>
            <div className="about-content">
              <h2>Conoce Carúpano</h2>
              <p>
                Carúpano, capital del municipio Bermúdez, es una ciudad portuaria ubicada
                en la costa norte del estado Sucre. Conocida como la "Ciudad Amable" y
                famosa por su tradicional Carnaval, el más antiguo de Venezuela.
              </p>
              <p>
                Nuestra municipalidad trabaja día a día para ofrecer servicios de calidad,
                promover el turismo y mejorar la calidad de vida de todos los carupaneros.
              </p>
              <ul className="about-list">
                <li><CheckCircle size={18} /> Patrimonio cultural e histórico</li>
                <li><CheckCircle size={18} /> Playas paradisíacas</li>
                <li><CheckCircle size={18} /> Tradición cacaotera</li>
                <li><CheckCircle size={18} /> Gastronomía única</li>
              </ul>
              <Link to="/alcaldia" className="btn btn-primary">
                Conocer más <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>¿Necesitas ayuda?</h2>
            <p>
              Nuestro asistente virtual está disponible 24/7 para responder tus preguntas
              sobre trámites, servicios y más.
            </p>
            <div className="cta-buttons">
              <Link to="/contacto" className="btn btn-secondary">
                <Users size={20} /> Atención Ciudadana
              </Link>
            </div>
            <p className="cta-hint">
              También puedes usar el chat en la esquina inferior derecha
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
