import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, Clock, MapPin } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/servicios', label: 'Servicios' },
    { path: '/tramites', label: 'Trámites' },
    { path: '/turismo', label: 'Turismo' },
    { path: '/noticias', label: 'Noticias' },
    { path: '/alcaldia', label: 'Alcaldía' },
    { path: '/contacto', label: 'Contacto' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="header">
      {/* Top bar */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-bar-left">
            <span><Phone size={14} /> (0294) 331-XXXX</span>
            <span><Mail size={14} /> alcaldia@carupano.gob.ve</span>
          </div>
          <div className="top-bar-right">
            <span><Clock size={14} /> Lun - Vie: 8:00 AM - 4:00 PM</span>
            <span><MapPin size={14} /> Calle Independencia, Carúpano</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="main-nav">
        <div className="container nav-content">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <span>MC</span>
            </div>
            <div className="logo-text">
              <span className="logo-title">Municipalidad</span>
              <span className="logo-subtitle">de Carúpano</span>
            </div>
          </Link>

          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={location.pathname === link.path ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <button className="menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
