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
import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/tramites" element={<Tramites />} />
          <Route path="/turismo" element={<Turismo />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/alcaldia" element={<Alcaldia />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
        <Footer />
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;
