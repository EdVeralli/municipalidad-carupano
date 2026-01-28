import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Pages.css';

const Noticias = () => {
  const noticias = [
    {
      id: 1,
      imagen: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=300&fit=crop',
      categoria: 'Obras Públicas',
      titulo: 'Rehabilitación de la Avenida Perimetral avanza al 80%',
      resumen: 'Los trabajos de asfaltado y mejoramiento del sistema de drenaje continúan en la principal arteria vial del municipio.',
      fecha: '25 Enero 2026',
      autor: 'Prensa Municipal'
    },
    {
      id: 2,
      imagen: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&h=300&fit=crop',
      categoria: 'Educación',
      titulo: 'Entrega de útiles escolares a estudiantes del municipio',
      resumen: 'Más de 5,000 estudiantes fueron beneficiados con kits escolares como parte del programa de apoyo educativo.',
      fecha: '23 Enero 2026',
      autor: 'Prensa Municipal'
    },
    {
      id: 3,
      imagen: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=300&fit=crop',
      categoria: 'Social',
      titulo: 'Jornada de atención médica gratuita este fin de semana',
      resumen: 'La alcaldía junto a organizaciones de salud realizarán consultas médicas, odontológicas y oftalmológicas.',
      fecha: '20 Enero 2026',
      autor: 'Prensa Municipal'
    },
    {
      id: 4,
      imagen: 'https://images.unsplash.com/photo-1569974507005-6dc61f97fb5c?w=600&h=300&fit=crop',
      categoria: 'Turismo',
      titulo: 'Preparativos del Carnaval 2026 en marcha',
      resumen: 'Las comparsas tradicionales ya iniciaron sus ensayos para el carnaval más antiguo de Venezuela.',
      fecha: '18 Enero 2026',
      autor: 'Prensa Municipal'
    },
    {
      id: 5,
      imagen: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=300&fit=crop',
      categoria: 'Servicios',
      titulo: 'Nuevo sistema de atención al ciudadano en línea',
      resumen: 'La municipalidad implementa plataforma digital para consultas y seguimiento de trámites.',
      fecha: '15 Enero 2026',
      autor: 'Prensa Municipal'
    },
    {
      id: 6,
      imagen: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=300&fit=crop',
      categoria: 'Ambiente',
      titulo: 'Campaña de reforestación en áreas verdes del municipio',
      resumen: 'Voluntarios y funcionarios plantaron más de 500 árboles en diferentes sectores de Carúpano.',
      fecha: '12 Enero 2026',
      autor: 'Prensa Municipal'
    }
  ];

  return (
    <main className="page-content">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <h1>Noticias</h1>
          <p>Mantente informado sobre las actividades y avances en tu municipio</p>
        </div>
      </section>

      {/* Noticias Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="noticias-grid">
            {noticias.map((noticia) => (
              <article key={noticia.id} className="noticia-card card">
                <div className="noticia-imagen">
                  <img src={noticia.imagen} alt={noticia.titulo} />
                  <span className="noticia-categoria">
                    <Tag size={12} /> {noticia.categoria}
                  </span>
                </div>
                <div className="noticia-content">
                  <h3>{noticia.titulo}</h3>
                  <p>{noticia.resumen}</p>
                  <div className="noticia-meta">
                    <span><Calendar size={14} /> {noticia.fecha}</span>
                    <span><User size={14} /> {noticia.autor}</span>
                  </div>
                  <button className="noticia-link">
                    Leer más <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">3</button>
            <button className="pagination-btn">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Noticias;
