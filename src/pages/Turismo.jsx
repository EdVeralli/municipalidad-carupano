import { MapPin, Camera, Utensils, Calendar, Sun, Waves } from 'lucide-react';
import './Pages.css';

const Turismo = () => {
  const destinos = [
    {
      imagen: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop',
      titulo: 'Playa Medina',
      descripcion: 'Considerada una de las playas más hermosas de Venezuela, con su icónica palmera inclinada sobre aguas cristalinas.',
      ubicacion: 'A 20 km de Carúpano'
    },
    {
      imagen: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=600&h=400&fit=crop',
      titulo: 'Playa Copey',
      descripcion: 'Hermosa playa de arena dorada ideal para el descanso y deportes acuáticos.',
      ubicacion: 'Carúpano'
    },
    {
      imagen: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&h=400&fit=crop',
      titulo: 'Río Caribe',
      descripcion: 'Pintoresco pueblo colonial con arquitectura histórica y ambiente tranquilo.',
      ubicacion: 'A 25 km de Carúpano'
    },
    {
      imagen: 'https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=600&h=400&fit=crop',
      titulo: 'Ruta del Cacao',
      descripcion: 'Visita las haciendas tradicionales y conoce el proceso del mejor cacao del mundo.',
      ubicacion: 'Península de Paria'
    }
  ];

  const eventos = [
    {
      fecha: 'Febrero',
      titulo: 'Carnaval de Carúpano',
      descripcion: 'El carnaval más antiguo de Venezuela, patrimonio cultural de la nación.'
    },
    {
      fecha: 'Agosto',
      titulo: 'Feria del Cacao',
      descripcion: 'Celebración de nuestra tradición cacaotera con muestras y degustaciones.'
    },
    {
      fecha: 'Diciembre',
      titulo: 'Fiestas Patronales',
      descripcion: 'Celebración religiosa y cultural en honor a nuestra patrona.'
    }
  ];

  return (
    <main className="page-content">
      {/* Hero */}
      <section className="page-hero turismo-hero">
        <div className="container">
          <h1>Turismo en Carúpano</h1>
          <p>Descubre las maravillas de la Perla del Caribe venezolano</p>
        </div>
      </section>

      {/* Destinos */}
      <section className="section-padding">
        <div className="container">
          <div className="section-title">
            <h2>Destinos Imperdibles</h2>
            <p>Los mejores lugares para visitar en Carúpano y sus alrededores</p>
          </div>

          <div className="destinos-grid">
            {destinos.map((destino, index) => (
              <div key={index} className="destino-card card">
                <div className="destino-imagen">
                  <img src={destino.imagen} alt={destino.titulo} />
                  <span className="destino-badge">
                    <Camera size={14} /> Destacado
                  </span>
                </div>
                <div className="destino-content">
                  <h3>{destino.titulo}</h3>
                  <p>{destino.descripcion}</p>
                  <span className="destino-ubicacion">
                    <MapPin size={14} /> {destino.ubicacion}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Turística */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="turismo-info-grid">
            <div className="turismo-info-card">
              <Sun size={40} />
              <h3>Clima Tropical</h3>
              <p>Temperatura promedio de 28°C durante todo el año. Ideal para visitar en cualquier época.</p>
            </div>
            <div className="turismo-info-card">
              <Waves size={40} />
              <h3>Playas Paradisíacas</h3>
              <p>Más de 20 playas vírgenes y de fácil acceso en la Península de Paria.</p>
            </div>
            <div className="turismo-info-card">
              <Utensils size={40} />
              <h3>Gastronomía</h3>
              <p>Pescado fresco, empanadas de cazón, y el famoso chocolate de Paria.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Eventos */}
      <section className="section-padding">
        <div className="container">
          <div className="section-title">
            <h2>Eventos y Festividades</h2>
            <p>Las celebraciones que hacen única a nuestra tierra</p>
          </div>

          <div className="eventos-grid">
            {eventos.map((evento, index) => (
              <div key={index} className="evento-card card">
                <div className="evento-fecha">
                  <Calendar size={20} />
                  <span>{evento.fecha}</span>
                </div>
                <h3>{evento.titulo}</h3>
                <p>{evento.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta turismo-cta">
        <div className="container">
          <h2>¡Ven a conocer Carúpano!</h2>
          <p>Una experiencia única de sol, playa, cultura y la mejor hospitalidad del oriente venezolano</p>
        </div>
      </section>
    </main>
  );
};

export default Turismo;
