import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Carousel.css';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { src: '/panoramica.png', title: 'Vista Panorámica de Carúpano' },
    { src: '/Foto1.png', title: 'Carúpano' },
    { src: '/Foto2.png', title: 'Paisajes de Carúpano' },
  ];

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="carousel-section">
      <div className="container">
        <div className="section-title">
          <h2>Galería de Carúpano</h2>
          <p>Descubre la belleza de nuestra tierra</p>
        </div>
      </div>

      <div className="carousel">
        <div className="carousel-inner">
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
            >
              <img src={image.src} alt={image.title} />
              <div className="carousel-caption">
                <h3>{image.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-btn prev" onClick={goToPrevious}>
          <ChevronLeft size={32} />
        </button>
        <button className="carousel-btn next" onClick={goToNext}>
          <ChevronRight size={32} />
        </button>

        <div className="carousel-dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
