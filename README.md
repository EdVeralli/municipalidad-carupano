# Municipalidad de Carupano - Demo

Sistema web para la Municipalidad de Carupano (Municipio Bermudez, Estado Sucre, Venezuela) con ChatBot integrado para atencion ciudadana.

## Caracteristicas

- Sitio web responsive y moderno
- 7 secciones: Inicio, Servicios, Tramites, Turismo, Noticias, Alcaldia, Contacto
- **ChatBot integrado** con respuestas sobre:
  - Tramites municipales (solvencia, patente, permisos)
  - Horarios de atencion
  - Ubicacion de oficinas
  - Turismo y eventos (Carnaval de Carupano)
  - Servicios municipales
  - Contacto y emergencias

## Tecnologias

- React 19
- Vite
- React Router DOM
- Lucide React (iconos)
- CSS3 con variables personalizadas

## Instalacion

```bash
# Clonar el repositorio
git clone https://github.com/EdVeralli/municipalidad-carupano.git

# Entrar al directorio
cd municipalidad-carupano

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## Uso del ChatBot

1. Haz clic en el boton de chat (esquina inferior derecha)
2. Escribe tu consulta o usa los botones de acceso rapido
3. El bot responde sobre tramites, horarios, turismo, etc.

### Ejemplos de consultas:
- "Cuales son los horarios de atencion?"
- "Que necesito para la solvencia municipal?"
- "Que lugares puedo visitar en Carupano?"
- "Cuando es el carnaval?"

## Estructura del Proyecto

```
src/
├── components/
│   ├── Header.jsx       # Navegacion
│   ├── Footer.jsx       # Pie de pagina
│   ├── ChatBot.jsx      # Asistente virtual
│   └── *.css
├── pages/
│   ├── Home.jsx
│   ├── Servicios.jsx
│   ├── Tramites.jsx
│   ├── Turismo.jsx
│   ├── Noticias.jsx
│   ├── Alcaldia.jsx
│   └── Contacto.jsx
├── data/
│   └── chatbotResponses.js  # Base de conocimientos
└── styles/
    └── globals.css
```

## Demo

Este es un proyecto de demostracion. Para produccion se recomienda:
- Integrar API de IA (Claude/OpenAI) para respuestas mas inteligentes
- Conectar con base de datos real
- Agregar autenticacion para tramites en linea
- Usar imagenes reales de Carupano

## Licencia

MIT
