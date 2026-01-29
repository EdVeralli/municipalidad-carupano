import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import Servicios from './pages/Servicios';
import Tramites from './pages/Tramites';
import Turismo from './pages/Turismo';
import Noticias from './pages/Noticias';
import Alcaldia from './pages/Alcaldia';
import Contacto from './pages/Contacto';

// Admin
import AdminLayout from './admin/components/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import Reglas from './admin/pages/Reglas';
import Conversaciones from './admin/pages/Conversaciones';

import './styles/globals.css';

// Layout para el sitio publico
const PublicLayout = ({ children }) => (
  <div className="app">
    <Header />
    {children}
    <Footer />
    <ChatBot />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas del sitio publico */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/servicios" element={<PublicLayout><Servicios /></PublicLayout>} />
        <Route path="/tramites" element={<PublicLayout><Tramites /></PublicLayout>} />
        <Route path="/turismo" element={<PublicLayout><Turismo /></PublicLayout>} />
        <Route path="/noticias" element={<PublicLayout><Noticias /></PublicLayout>} />
        <Route path="/alcaldia" element={<PublicLayout><Alcaldia /></PublicLayout>} />
        <Route path="/contacto" element={<PublicLayout><Contacto /></PublicLayout>} />

        {/* Rutas del panel admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="reglas" element={<Reglas />} />
          <Route path="conversaciones" element={<Conversaciones />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
