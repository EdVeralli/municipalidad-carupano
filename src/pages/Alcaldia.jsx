import {
  Target, Eye, Award, Users, Building2, FileCheck,
  TrendingUp, Heart, Shield, Briefcase
} from 'lucide-react';
import './Pages.css';

const Alcaldia = () => {
  const valores = [
    { icon: <Shield size={24} />, titulo: 'Transparencia', descripcion: 'Gestión abierta y rendición de cuentas' },
    { icon: <Heart size={24} />, titulo: 'Compromiso', descripcion: 'Dedicación al servicio del pueblo' },
    { icon: <Users size={24} />, titulo: 'Participación', descripcion: 'Inclusión ciudadana en las decisiones' },
    { icon: <TrendingUp size={24} />, titulo: 'Eficiencia', descripcion: 'Optimización de recursos públicos' }
  ];

  const direcciones = [
    { nombre: 'Dirección de Hacienda', descripcion: 'Recaudación y administración tributaria' },
    { nombre: 'Dirección de Ingeniería Municipal', descripcion: 'Obras públicas y permisos de construcción' },
    { nombre: 'Dirección de Desarrollo Social', descripcion: 'Programas sociales y atención comunitaria' },
    { nombre: 'Dirección de Catastro', descripcion: 'Registro y actualización de inmuebles' },
    { nombre: 'Dirección de Turismo', descripcion: 'Promoción turística del municipio' },
    { nombre: 'Dirección de Ambiente', descripcion: 'Gestión ambiental y áreas verdes' }
  ];

  const logros = [
    { numero: '50+', texto: 'Obras ejecutadas en 2025' },
    { numero: '10,000', texto: 'Familias beneficiadas' },
    { numero: '25', texto: 'Programas sociales activos' },
    { numero: '100%', texto: 'Compromiso con Carúpano' }
  ];

  return (
    <main className="page-content">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <h1>La Alcaldía</h1>
          <p>Conoce nuestra institución y el equipo que trabaja por Carúpano</p>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="section-padding">
        <div className="container">
          <div className="mision-vision-grid">
            <div className="mv-card card">
              <div className="mv-icon">
                <Target size={40} />
              </div>
              <h3>Misión</h3>
              <p>
                Garantizar el bienestar de todos los habitantes del Municipio Bermúdez,
                a través de una gestión eficiente, transparente y participativa, que
                promueva el desarrollo integral y sostenible de nuestra comunidad.
              </p>
            </div>
            <div className="mv-card card">
              <div className="mv-icon">
                <Eye size={40} />
              </div>
              <h3>Visión</h3>
              <p>
                Ser un municipio modelo en gestión pública, reconocido por su calidad
                de servicios, desarrollo turístico y preservación de tradiciones
                culturales, donde todos los carupaneros disfruten de una mejor
                calidad de vida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="section-title">
            <h2>Nuestros Valores</h2>
            <p>Los principios que guían nuestra gestión</p>
          </div>
          <div className="valores-grid">
            {valores.map((valor, index) => (
              <div key={index} className="valor-card">
                <div className="valor-icon">{valor.icon}</div>
                <h4>{valor.titulo}</h4>
                <p>{valor.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logros */}
      <section className="section-padding alcaldia-logros">
        <div className="container">
          <div className="section-title">
            <h2 style={{ color: 'white' }}>Logros de Gestión</h2>
          </div>
          <div className="logros-grid">
            {logros.map((logro, index) => (
              <div key={index} className="logro-item">
                <span className="logro-numero">{logro.numero}</span>
                <span className="logro-texto">{logro.texto}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estructura */}
      <section className="section-padding">
        <div className="container">
          <div className="section-title">
            <h2>Estructura Organizativa</h2>
            <p>Conoce las direcciones que conforman nuestra alcaldía</p>
          </div>
          <div className="direcciones-grid">
            {direcciones.map((dir, index) => (
              <div key={index} className="direccion-card card">
                <Building2 size={24} />
                <div>
                  <h4>{dir.nombre}</h4>
                  <p>{dir.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Historia */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="historia-content">
            <div className="section-title">
              <h2>Historia del Municipio</h2>
            </div>
            <div className="historia-text">
              <p>
                <strong>Carúpano</strong>, capital del municipio Bermúdez, fue fundada en 1647
                y se ha convertido en una de las ciudades más importantes del oriente venezolano.
                Su nombre proviene del vocablo indígena "Karupana".
              </p>
              <p>
                Históricamente fue uno de los principales puertos de exportación de cacao de
                Venezuela, lo que le dio prosperidad económica y un rico patrimonio arquitectónico
                que aún se conserva en su casco histórico.
              </p>
              <p>
                Es mundialmente conocida por su <strong>Carnaval</strong>, el más antiguo de
                Venezuela, declarado Patrimonio Cultural de la Nación, que cada año atrae a
                miles de visitantes de todo el país y el mundo.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Alcaldia;
