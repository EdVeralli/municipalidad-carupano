import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Columna 1: Información */}
            <div className="footer-col">
              <div className="footer-logo">
                <div className="logo-icon">
                  <span>MC</span>
                </div>
                <div className="logo-text">
                  <span className="logo-title">Municipalidad</span>
                  <span className="logo-subtitle">de Carúpano</span>
                </div>
              </div>
              <p className="footer-description">
                Trabajando por el bienestar y desarrollo de todos los carupaneros.
                Una gestión transparente al servicio del pueblo.
              </p>
              <div className="social-links">
                <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                <a href="#" aria-label="YouTube"><Youtube size={20} /></a>
              </div>
            </div>

            {/* Columna 2: Enlaces rápidos */}
            <div className="footer-col">
              <h4>Enlaces Rápidos</h4>
              <ul className="footer-links">
                <li><Link to="/servicios">Servicios</Link></li>
                <li><Link to="/tramites">Trámites</Link></li>
                <li><Link to="/turismo">Turismo</Link></li>
                <li><Link to="/noticias">Noticias</Link></li>
                <li><Link to="/alcaldia">La Alcaldía</Link></li>
                <li><Link to="/contacto">Contacto</Link></li>
              </ul>
            </div>

            {/* Columna 3: Trámites populares */}
            <div className="footer-col">
              <h4>Trámites Populares</h4>
              <ul className="footer-links">
                <li><Link to="/tramites">Solvencia Municipal</Link></li>
                <li><Link to="/tramites">Patente Comercial</Link></li>
                <li><Link to="/tramites">Permiso de Construcción</Link></li>
                <li><Link to="/tramites">Certificado de Residencia</Link></li>
                <li><Link to="/tramites">Pago de Impuestos</Link></li>
              </ul>
            </div>

            {/* Columna 4: Contacto */}
            <div className="footer-col">
              <h4>Contacto</h4>
              <ul className="contact-info">
                <li>
                  <MapPin size={18} />
                  <span>Calle Independencia, frente a Plaza Colón, Carúpano, Estado Sucre</span>
                </li>
                <li>
                  <Phone size={18} />
                  <span>(0294) 331-XXXX</span>
                </li>
                <li>
                  <Mail size={18} />
                  <span>alcaldia@carupano.gob.ve</span>
                </li>
                <li>
                  <Clock size={18} />
                  <span>Lun - Vie: 8:00 AM - 4:00 PM</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <p>&copy; {currentYear} Alcaldía del Municipio Bermúdez - Carúpano. Todos los derechos reservados.</p>
          <p className="demo-notice">DEMO - Sistema de Atención Ciudadana con ChatBot</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
