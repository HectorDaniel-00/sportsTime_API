# SportsTime API - Backend

API REST + WebSockets para sistema de reserva de canchas deportivas con disponibilidad en tiempo real.

## 🚀 Tecnologías

- **NestJS 10** + TypeScript
- **MongoDB** con Mongoose ODM
- **WebSockets** (Socket.io)
- **JWT** para autenticación
- **Stripe** (modo sandbox para pagos simulados)
- **Nodemailer** para emails de confirmación
- **Class-validator** + **class-transformer**
- **N8N** para automatizaciones

---

## 📋 Requisitos previos

- Node.js v18+ o v20+
- MongoDB (local o Atlas)
- Cuenta de Stripe (modo test)
- Cuenta de Gmail (para nodemailer)

---


## 🔧 Variables de entorno

Crear archivo `.env` en la raíz:

```env
# App
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/sportstime

# JWT
JWT_SECRET=tu_super_secret_key_min_32_chars
JWT_EXPIRES_IN=7d

# Stripe (sandbox)
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Email (Gmail)
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicacion
EMAIL_FROM=SportsTime <noreply@sportstime.com>

# Frontend URL
FRONTEND_URL=http://localhost:4200
```

---

## 📦 Instalación

```bash
# Clonar repositorio
git clone https://github.com/tuusuario/sportstime-backend.git
cd sportstime-backend

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run start:dev

# Build para producción
npm run build
npm run start:prod
```

---

## 🗂️ Estructura del proyecto

```bash
src/
├── modules/
│   ├── auth/          # Login, registro, JWT
│   ├── users/         # CRUD de usuarios
│   ├── courts/        # Gestión de canchas
│   ├── bookings/      # Reservas + WebSocket gateway
│   ├── payments/      # Integración con Stripe
│   └── notifications/ # Emails y notificaciones
├── common/            # Guards, interceptors, decorators
├── config/            # Configuraciones modulares
└── utils/             # Helpers (fechas, validaciones)
```

---

## 🔌 Endpoints principales


---

## Test

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

---

## 📦 Scripts útiles

```bash
npm run seed          # Llenar DB con datos de ejemplo
npm run db:drop       # Eliminar todas las colecciones
npm run lint          # Ejecutar ESLint
npm run format        # Formatear código con Prettier
```

---

## 🐳 Docker

```bash
# Levantar contenedores
docker compose up --build 

# Levantar contenedores en segundo plano
docker compose up --build -d

# Para contenedores
docker compose up stop

# Eliminar contenedores
docker compose down 

# Eliminar contenedores con los volumenes
docker compose down -v
```

---

## 👨‍💻 Autor

- **Hector Vargas**
- **GitHub:** https://github.com/HectorDaniel-00
