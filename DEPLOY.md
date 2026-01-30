# Guia de Deploy - Municipalidad de Carupano

Esta guia explica como deployar el proyecto en la nube de forma gratuita.

## Arquitectura de Deploy

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     Vercel      │────▶│     Render      │────▶│   UptimeRobot   │
│    Frontend     │     │    Backend      │     │   Monitoreo     │
│                 │◀────│                 │◀────│                 │
│  React + Vite   │     │  FastAPI + SQL  │     │  Ping cada 5m   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Paso 1: Deploy del Backend en Render

1. Ir a **https://render.com**
2. Click en **Get Started** → Registrarse con GitHub
3. Autorizar acceso al repositorio `municipalidad-carupano`
4. Click en **New** → **Web Service**
5. Seleccionar el repositorio `municipalidad-carupano`
6. Configurar:
   | Campo | Valor |
   |-------|-------|
   | **Name** | `municipalidad-carupano-api` |
   | **Region** | `Oregon (US West)` o el mas cercano |
   | **Branch** | `master` |
   | **Root Directory** | `backend` |
   | **Runtime** | `Python 3` |
   | **Build Command** | `pip install -r requirements.txt && python init_data.py` |
   | **Start Command** | `gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:$PORT` |
   | **Instance Type** | `Free` |

7. Click en **Create Web Service**
8. Esperar que termine el deploy (~2-3 minutos)
9. **Copiar la URL** que aparece (ej: `https://municipalidad-carupano-api.onrender.com`)

### Verificar Backend

Abrir en el navegador:
- `https://TU-URL.onrender.com` → Debe mostrar JSON con info de la API
- `https://TU-URL.onrender.com/docs` → Documentacion Swagger

---

## Paso 2: Deploy del Frontend en Vercel

1. Ir a **https://vercel.com**
2. Click en **Sign Up** → Registrarse con GitHub
3. Autorizar acceso al repositorio
4. Click en **Add New...** → **Project**
5. Buscar y seleccionar `municipalidad-carupano`
6. **IMPORTANTE:** Antes de deployar, expandir **Environment Variables**
7. Agregar variable:
   | Name | Value |
   |------|-------|
   | `VITE_API_URL` | `https://TU-URL.onrender.com` (la URL del paso 1) |

8. Click en **Deploy**
9. Esperar que termine (~1-2 minutos)
10. **Copiar la URL** del sitio (ej: `https://municipalidad-carupano.vercel.app`)

### Verificar Frontend

Abrir en el navegador:
- `https://TU-URL.vercel.app` → Sitio web principal
- `https://TU-URL.vercel.app/admin` → Panel de administracion
- Probar el chat en la esquina inferior derecha

---

## Paso 3: Configurar Monitoreo (UptimeRobot)

El plan gratuito de Render "duerme" el servicio despues de 15 minutos sin uso.
Para evitar esto, configuramos un monitor que hace ping cada 5 minutos.

1. Ir a **https://uptimerobot.com**
2. Click en **Register for FREE**
3. Crear cuenta y confirmar email
4. En el dashboard, click en **+ Add New Monitor**
5. Configurar:
   | Campo | Valor |
   |-------|-------|
   | **Monitor Type** | `HTTP(s)` |
   | **Friendly Name** | `Municipalidad Carupano API` |
   | **URL (or IP)** | `https://TU-URL.onrender.com/health` |
   | **Monitoring Interval** | `5 minutes` |

6. Click en **Create Monitor**

### Verificar Monitoreo

- El monitor debe mostrar estado **"Up"** en verde
- Recibiras alertas por email si el servicio se cae

---

## URLs Finales

| Servicio | URL |
|----------|-----|
| **Sitio Web** | https://municipalidad-carupano.vercel.app |
| **Panel Admin** | https://municipalidad-carupano.vercel.app/admin |
| **API Backend** | https://municipalidad-carupano.onrender.com |
| **API Docs** | https://municipalidad-carupano.onrender.com/docs |

---

## Actualizaciones

Para actualizar el sitio despues de hacer cambios en el codigo:

```bash
git add .
git commit -m "descripcion del cambio"
git push
```

**Vercel y Render detectan el push automaticamente y re-deployean.**

No es necesario hacer nada manual en los dashboards.

---

## Troubleshooting

### El chat no responde
- Verificar que el backend este corriendo en Render
- Revisar que `VITE_API_URL` este bien configurada en Vercel

### Error 404 en /admin
- Verificar que exista el archivo `vercel.json` en la raiz del proyecto

### El backend tarda en responder
- Es normal la primera vez (~30 seg) si el servicio estaba dormido
- Verificar que UptimeRobot este configurado correctamente

### Cambios no se reflejan
- Verificar que el `git push` se haya completado
- Revisar el dashboard de Vercel/Render para ver el estado del deploy

---

## Costos

| Servicio | Plan | Costo |
|----------|------|-------|
| Vercel | Hobby | **Gratis** |
| Render | Free | **Gratis** |
| UptimeRobot | Free | **Gratis** |

**Total: $0/mes**

---

## Soporte

- **Vercel Docs:** https://vercel.com/docs
- **Render Docs:** https://render.com/docs
- **UptimeRobot Docs:** https://uptimerobot.com/help
