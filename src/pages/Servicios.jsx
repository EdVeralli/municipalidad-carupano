import {
  Trash2, Lightbulb, Building, Heart, Users, Briefcase,
  GraduationCap, TreePine, Shield, Wrench, Phone, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './Pages.css';

const Servicios = () => {
  const servicios = [
    {
      icon: <Trash2 size={28} />,
      title: 'Aseo Urbano',
      description: 'Recolección de desechos sólidos y limpieza de espacios públicos en todo el municipio.',
      horario: 'Lunes a Sábado'
    },
    {
      icon: <Lightbulb size={28} />,
      title: 'Alumbrado Público',
      description: 'Mantenimiento y reparación del sistema de iluminación en calles y plazas.',
      horario: 'Reporte 24/7'
    },
    {
      icon: <Building size={28} />,
      title: 'Catastro Municipal',
      description: 'Registro y actualización de bienes inmuebles del municipio.',
      horario: 'Lun - Vie: 8am - 3pm'
    },
    {
      icon: <Heart size={28} />,
      title: 'Programas Sociales',
      description: 'Apoyo a familias vulnerables, adultos mayores y personas con discapacidad.',
      horario: 'Lun - Vie: 8am - 4pm'
    },
    {
      icon: <Users size={28} />,
      title: 'Atención al Ciudadano',
      description: 'Orientación y asistencia para todos tus trámites y consultas.',
      horario: 'Lun - Vie: 8am - 5pm'
    },
    {
      icon: <Briefcase size={28} />,
      title: 'Apoyo a Emprendedores',
      description: 'Asesoría y acompañamiento para nuevos negocios y PYMES.',
      horario: 'Lun - Vie: 9am - 12pm'
    },
    {
      icon: <GraduationCap size={28} />,
      title: 'Educación y Cultura',
      description: 'Talleres, cursos y actividades culturales para la comunidad.',
      horario: 'Según programación'
    },
    {
      icon: <TreePine size={28} />,
      title: 'Ambiente y Áreas Verdes',
      description: 'Mantenimiento de parques, plazas y espacios recreativos.',
      horario: 'Lun - Vie'
    },
    {
      icon: <Shield size={28} />,
      title: 'Policía Municipal',
      description: 'Seguridad ciudadana y orden público en el municipio.',
      horario: '24/7'
    },
    {
      icon: <Wrench size={28} />,
      title: 'Obras Públicas',
      description: 'Mantenimiento de vías, aceras y drenajes municipales.',
      horario: 'Lun - Vie: 7am - 3pm'
    }
  ];

  return (
    <main className="page-content">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <h1>Servicios Municipales</h1>
          <p>Conoce todos los servicios que la Alcaldía de Carúpano pone a tu disposición</p>
        </div>
      </section>

      {/* Servicios Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="services-page-grid">
            {servicios.map((servicio, index) => (
              <div key={index} className="service-page-card card">
                <div className="service-page-icon">{servicio.icon}</div>
                <div className="service-page-content">
                  <h3>{servicio.title}</h3>
                  <p>{servicio.description}</p>
                  <span className="service-horario">{servicio.horario}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta">
        <div className="container">
          <h2>¿Necesitas más información?</h2>
          <p>Contáctanos o utiliza nuestro asistente virtual para resolver tus dudas</p>
          <Link to="/contacto" className="btn btn-secondary">
            <Phone size={20} /> Contactar
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Servicios;
