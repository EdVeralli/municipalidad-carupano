# Municipalidad de Carupano - Plataforma Chatbot

Sistema web para la Municipalidad de Carupano con ChatBot integrado y panel de administracion.

## Arquitectura

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    Frontend     │────▶│     Backend     │────▶│    Database     │
│  React + Vite   │     │  Python FastAPI │     │     SQLite      │
│                 │◀────│                 │     │                 │
│  Widget Chat    │     │  API REST       │     │  Reglas/Chat    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Caracteristicas

### Frontend (React)
- Sitio web responsive y moderno
- 7 secciones: Inicio, Servicios, Tramites, Turismo, Noticias, Alcaldia, Contacto
- Widget de chat integrado

### Backend (FastAPI)
- API REST para el chatbot
- Sistema de reglas con palabras clave
- Panel de administracion
- Historial de conversaciones
- Multi-cliente (varios municipios en una instancia)

## Instalacion

### Frontend

```bash
cd municipalidad-carupano
npm install
npm run dev
```

### Backend

```bash
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno (Windows)
venv\Scripts\activate

# Activar entorno (Linux/Mac)
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Inicializar base de datos con datos de ejemplo
python init_data.py

# Iniciar servidor
uvicorn app.main:app --reload --port 8000
```

## Endpoints de la API

### Chat (Widget)
- `POST /chat/{client_slug}` - Enviar mensaje al bot
- `GET /chat/{client_slug}/history/{session_id}` - Historial de conversacion
- `GET /chat/{client_slug}/config` - Configuracion del chat

### Admin (Panel)
- `GET /admin/clients` - Listar clientes
- `POST /admin/clients` - Crear cliente
- `GET /admin/clients/{id}/rules` - Listar reglas
- `POST /admin/clients/{id}/rules` - Crear regla
- `PUT /admin/clients/{id}/rules/{rule_id}` - Editar regla
- `DELETE /admin/clients/{id}/rules/{rule_id}` - Eliminar regla
- `GET /admin/clients/{id}/conversations` - Ver conversaciones
- `GET /admin/clients/{id}/dashboard` - Estadisticas

### Documentacion
- `GET /docs` - Swagger UI
- `GET /redoc` - ReDoc

## Estructura del Proyecto

```
municipalidad-carupano/
├── src/                    # Frontend React
│   ├── components/
│   ├── pages/
│   ├── data/
│   └── styles/
├── backend/                # Backend Python
│   ├── app/
│   │   ├── models/        # Modelos SQLAlchemy
│   │   ├── routers/       # Endpoints API
│   │   ├── services/      # Logica del chatbot
│   │   ├── database.py
│   │   ├── schemas.py
│   │   └── main.py
│   ├── init_data.py       # Script inicializacion
│   └── requirements.txt
├── package.json
└── README.md
```

## Uso del ChatBot

1. Haz clic en el boton de chat (esquina inferior derecha)
2. Escribe tu consulta
3. El bot busca coincidencias en las reglas configuradas
4. Responde con la regla que tenga mayor prioridad

## Licencia

MIT
