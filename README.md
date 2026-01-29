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
- Galeria carousel con imagenes de Carupano
- Imagenes personalizadas (panoramica, paisajes)

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
- `DELETE /admin/clients/{id}/conversations/{conv_id}` - Eliminar conversacion
- `DELETE /admin/clients/{id}/conversations` - Eliminar todas las conversaciones
- `GET /admin/clients/{id}/dashboard` - Estadisticas

### Documentacion
- `GET /docs` - Swagger UI
- `GET /redoc` - ReDoc

## Estructura del Proyecto

```
municipalidad-carupano/
├── public/                 # Imagenes estaticas
│   ├── panoramica.png     # Fondo hero
│   ├── Foto1.png          # Carousel
│   └── Foto2.png          # Carousel
├── src/                    # Frontend React
│   ├── admin/             # Panel de administracion
│   │   ├── components/
│   │   └── pages/         # Dashboard, Reglas, Conversaciones
│   ├── components/        # Carousel, ChatBot, Header, Footer
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

## Ejecucion

Abrir dos terminales:

**Terminal 1 - Backend:**
```bash
cd backend
venv\Scripts\activate        # Windows
uvicorn app.main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Acceder a:
- **Sitio web:** http://localhost:5173
- **Panel admin:** http://localhost:5173/admin
- **API docs:** http://localhost:8000/docs

## Uso del ChatBot

1. Haz clic en el boton de chat (esquina inferior derecha)
2. Escribe tu consulta
3. El bot busca coincidencias en las reglas configuradas
4. Responde con la regla que tenga mayor prioridad

## Panel de Administracion

Accede a `/admin` para gestionar el chatbot:

- **Dashboard**: Estadisticas de conversaciones y mensajes
- **Reglas**: Crear, editar y eliminar reglas del bot
- **Conversaciones**: Ver historial de chats y eliminar conversaciones

## Deploy en Produccion

### Backend en Render (gratis)

1. Ir a [render.com](https://render.com) y crear cuenta
2. New → Web Service → Conectar repo de GitHub
3. Configurar:
   - **Root Directory:** `backend`
   - **Build Command:** `pip install -r requirements.txt && python init_data.py`
   - **Start Command:** `gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:$PORT`
4. Deploy y copiar la URL (ej: `https://municipalidad-carupano-api.onrender.com`)

### Frontend en Vercel (gratis)

1. Ir a [vercel.com](https://vercel.com) y crear cuenta
2. New Project → Importar repo de GitHub
3. En Settings → Environment Variables agregar:
   - `VITE_API_URL` = URL de Render (del paso anterior)
4. Deploy

### URLs finales
- **Sitio:** `https://municipalidad-carupano.vercel.app`
- **API:** `https://municipalidad-carupano-api.onrender.com`

## Licencia

MIT
