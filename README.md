# 🎨 Frontend - Plataforma de Intercambio

> **Interfaz de usuario moderna y responsive** | Proyecto Intermodular DAW2  
> Aplicación SPA construida con **React**, **Vite** y **Tailwind CSS**

![JavaScript](https://img.shields.io/badge/JavaScript-87.8%25-yellow)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-7.2.4-blueviolet)
![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-4.1.18-06B6D4)
![React Router](https://img.shields.io/badge/React%20Router-7.9.6-red)
![Status](https://img.shields.io/badge/Status-Fase%20Final-success)
![License](https://img.shields.io/badge/License-Open%20Source-green)

---

## 📋 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Características Principales](#características-principales)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Guía de Uso](#guía-de-uso)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Componentes Principales](#componentes-principales)
- [Servicios y API](#servicios-y-api)
- [Scripts Disponibles](#scripts-disponibles)
- [Configuración del Entorno](#configuración-del-entorno)
- [Despliegue](#despliegue)
- [Git Workflow](#git-workflow)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Descripción General

**HellinMarket Frontend** es una interfaz de usuario moderna, responsive y escalable que sirve como cliente para la plataforma de intercambio de material estudiantil. Proporciona una experiencia de usuario intuitiva con:

- ✅ **Autenticación JWT** con Google OAuth integrado
- ✅ **SPA (Single Page Application)** sin recargas innecesarias
- ✅ **Interfaz Responsive** - Adaptable a todos los dispositivos
- ✅ **Componentes Reutilizables** - Arquitectura modular y escalable
- ✅ **Estado Global** - Context API para gestión eficiente
- ✅ **Validación de Formularios** - Input seguro y validado
- ✅ **Progressive Web App** - Funcionalidades offline
- ✅ **Notificaciones Toast** - Feedback visual inmediato
- ✅ **Gráficos y Estadísticas** - Dashboards interactivos

**Versión actual:** 1.0 (Fase Final) ✅

---

## ✨ Características Principales

### 🔐 Autenticación Segura
- **JWT (JSON Web Tokens)** para sesiones seguras
- **Google OAuth 2.0** para login social
- **Token Management** - Refresh automático de tokens
- **Protected Routes** - Rutas privadas con validación

### 🎨 Diseño Moderno
- **Tailwind CSS 4.1** para estilos utilitarios
- **Radix UI** para componentes accesibles
- **Diseño Responsive** - Mobile-first approach
- **Animaciones Suaves** - UX mejorada con transiciones

### 📱 Progressive Web App
- **Service Worker** para funcionamiento offline
- **Manifest.json** - Instalable como app nativa
- **Cache Strategies** - Optimización de carga

### 🔄 Gestión de Estado
- **React Context API** para estado global
- **AuthProvider** - Autenticación centralizada
- **Custom Hooks** - Lógica reutilizable
- **Local Storage** - Persistencia de datos

### 📊 Visualización de Datos
- **Recharts** para gráficos interactivos
- **Tablas Dinámicas** - Información organizada
- **Filtrado y Búsqueda** - Herramientas de navegación
- **Paginación** - Carga eficiente de datos

### 🚀 Performance
- **Vite 7.2.4** - Build ultrarrápido
- **SWC Compiler** - Compilación optimizada
- **Tree Shaking** - Eliminación de código no usado
- **Code Splitting** - Carga por demanda de módulos

---

## 🚀 Requisitos Previos

Asegúrate de tener instalado:

- **Node.js 16.0.0+** (recomendado 18.0.0 o superior)
- **npm 8.0.0+** o **yarn 3.0.0+**
- **Git** para control de versiones
- **Backend** (Django API) corriendo en `http://localhost:8000`

**Verificar instalación:**
```bash
node --version      # Debe ser v16.0.0 o superior
npm --version       # Debe ser 8.0.0 o superior
git --version       # Debe estar instalado
```

---

## 📥 Instalación

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/Josegrcia02/Intercambio_de_productos_frontend.git
cd Intercambio_de_productos_frontend
```

### 2️⃣ Instalar Dependencias

```bash
npm install
```

Esto instalará todas las librerías necesarias listadas en `package.json`:

**Dependencias principales:**
- react (19.2.0)
- react-dom (19.2.0)
- react-router-dom (7.9.6)
- axios (1.13.2)
- @tailwindcss/postcss (4.1.18)
- recharts (3.8.1)
- sonner (2.0.7)
- lucide-react (0.563.0)

**Dev Dependencies:**
- vite (7.2.4)
- @vitejs/plugin-react-swc (4.2.2)
- tailwindcss (4.1.18)
- eslint (9.39.1)

### 3️⃣ Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# === API Backend ===
VITE_API_URL=http://127.0.0.1:8000/api

# === Google OAuth ===
VITE_GOOGLE_CLIENT_ID=tu_google_client_id_aqui

# === Entorno ===
VITE_ENV=development
```

**Variables necesarias:**
- `VITE_API_URL` - URL del backend (desarrollo: http://127.0.0.1:8000/api)
- `VITE_GOOGLE_CLIENT_ID` - ID de cliente de Google OAuth
- `VITE_ENV` - Entorno (development/production)

### 4️⃣ Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

La aplicación se abrirá automáticamente en:
```
http://localhost:5173
```

---

## 📖 Guía de Uso

### 🔐 Autenticación

**Login Tradicional:**
1. Ve a la página de login
2. Ingresa username y contraseña
3. Haz clic en "Iniciar Sesión"

**Login con Google:**
1. Ve a la página de login
2. Haz clic en "Google Login"
3. Completa el login de Google
4. Autoriza la aplicación

### 📦 Gestión de Productos

**Crear Producto:**
1. Ve a "Mis Productos"
2. Haz clic en "Crear Nuevo"
3. Completa el formulario
4. Sube imágenes
5. Haz clic en "Publicar"

**Editar Producto:**
1. Ve a "Mis Productos"
2. Selecciona el producto
3. Haz clic en "Editar"
4. Realiza cambios
5. Haz clic en "Guardar"

**Eliminar Producto:**
1. Ve a "Mis Productos"
2. Selecciona el producto
3. Haz clic en "Eliminar"
4. Confirma la acción

### 🔍 Búsqueda y Filtrado

- **Barra de Búsqueda** - Busca por nombre del producto
- **Filtros por Categoría** - Organiza por tipo
- **Ordenamiento** - Por fecha, relevancia, precio
- **Búsqueda Avanzada** - Criterios múltiples

### 💬 Mensajería

- **Ver Mensajes** - Inbox centralizado
- **Enviar Mensaje** - Contacta otros usuarios
- **Responder** - Conversaciones fluidas
- **Notificaciones** - Alertas de nuevos mensajes

---

## 🛠️ Tecnologías Utilizadas

### Frontend Framework
- **React 19.2.0** - Library para construir UIs
- **React DOM 19.2.0** - Renderización en el navegador
- **JSX** - Sintaxis de componentes

### Enrutamiento
- **React Router DOM 7.9.6** - Navegación SPA
- **Rutas Protegidas** - PrivateRoute component
- **Parámetros Dinámicos** - URLs con variables

### Estilos y UI
- **Tailwind CSS 4.1.18** - CSS utilitario
- **PostCSS 8.5.6** - Procesamiento de CSS
- **Radix UI** - Componentes accesibles
- **Lucide React 0.563.0** - Iconografía

### Estado y Contexto
- **React Context API** - Estado global
- **Custom Hooks** - Lógica reutilizable
- **Local Storage** - Persistencia cliente

### Comunicación API
- **Axios 1.13.2** - Cliente HTTP
- **JWT Tokens** - Autenticación segura
- **Interceptores** - Manejo centralizado de requests

### Gráficos y Datos
- **Recharts 3.8.1** - Gráficos interactivos
- **Tablas Dinámicas** - Presentación de datos
- **Filtrado** - Búsqueda y ordenamiento

### Notificaciones
- **Sonner 2.0.7** - Toast notifications
- **Feedback Visual** - Mensajes de error/éxito
- **Posicionamiento Configurable** - Top-right, bottom-left, etc.

### Autenticación Social
- **@react-oauth/google 0.13.5** - Google OAuth 2.0
- **Token Management** - Refresh y expiración

### Build Tool
- **Vite 7.2.4** - Build moderno y rápido
- **@vitejs/plugin-react-swc 4.2.2** - Compilación SWC
- **vite-plugin-pwa 1.3.0** - PWA support

### Development Tools
- **ESLint 9.39.1** - Code quality
- **TypeScript types** - Type safety
- **Autoprefixer** - CSS prefixes automáticos

---

## 🗂️ Estructura del Proyecto

```
Intercambio_de_productos_frontend/
├── src/
│   ├── components/                # Componentes reutilizables
│   │   ├── common/               # Elementos básicos
│   │   │   ├── Button.jsx        # Botón reutilizable
│   │   │   ├── Input.jsx         # Input reutilizable
│   │   │   ├── Card.jsx          # Card component
│   │   │   └── Modal.jsx         # Modal dialog
│   │   ├── layout/               # Layout components
│   │   │   ├── Navbar.jsx        # Barra de navegación
│   │   │   ├── Sidebar.jsx       # Menú lateral
│   │   │   ├── Footer.jsx        # Pie de página
│   │   │   └── Layout.jsx        # Layout principal
│   │   └── features/             # Componentes específicos
│   │       ├── ProductCard.jsx
│   │       ├── UserProfile.jsx
│   │       └── ...
│   │
│   ├── pages/                     # Páginas completas (rutas)
│   │   ├── LoginPage.jsx          # Autenticación
│   │   ├── HomePage.jsx           # Inicio
│   │   ├── ProductsPage.jsx       # Listado de productos
│   │   ├── ProductDetailPage.jsx  # Detalle de producto
│   │   ├── ProfilePage.jsx        # Perfil de usuario
│   │   ├── MessagesPage.jsx       # Mensajería
│   │   ├── DashboardPage.jsx      # Dashboard
│   │   └── NotFoundPage.jsx       # 404
│   │
│   ├── context/                   # Estado global (Context API)
│   │   ├── AuthContext.js         # Contexto de autenticación
│   │   ├── AuthProvider.jsx       # Provider de auth
│   │   ├── ThemeContext.js        # Tema (light/dark)
│   │   └── NotificationContext.js # Notificaciones
│   │
│   ├── hooks/                     # Custom Hooks
│   │   ├── useAuth.js             # Hook de autenticación
│   │   ├── useApi.js              # Hook para API calls
│   │   ├── usePagination.js       # Hook de paginación
│   │   └── useLocalStorage.js     # Hook de localStorage
│   │
│   ├── routes/                    # Configuración de rutas
│   │   ├── AppRouter.jsx          # Router principal
│   │   ├── PrivateRoute.jsx       # Ruta protegida
│   │   └── routes.config.js       # Configuración de rutas
│   │
│   ├── services/                  # Llamadas a API
│   │   ├── api.js                 # Cliente Axios configurado
│   │   ├── authService.js         # Endpoints de auth
│   │   ├── productService.js      # Endpoints de productos
│   │   ├── userService.js         # Endpoints de usuarios
│   │   └── messageService.js      # Endpoints de mensajes
│   │
│   ├── assets/                    # Recursos estáticos
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── utils/                     # Funciones utilitarias
│   │   ├── validators.js          # Validación de datos
│   │   ├── formatters.js          # Formateo de datos
│   │   ├── constants.js           # Constantes de la app
│   │   └── helpers.js             # Funciones auxiliares
│   │
│   ├── App.jsx                    # Componente raíz
│   ├── App.css                    # Estilos de App
│   ├── index.css                  # Estilos globales
│   └── main.jsx                   # Entry point
│
├── public/                        # Archivos públicos
│   ├── logo.svg                  # Logo
│   ├── logo.png                  # Logo PNG
│   ├── manifest.json             # PWA manifest
│   └── sw.js                     # Service Worker
│
├── index.html                     # HTML raíz
├── vite.config.js                 # Configuración Vite
├── tailwind.config.js             # Configuración Tailwind
├── postcss.config.js              # Configuración PostCSS
├── eslint.config.js               # Configuración ESLint
├── package.json                   # Dependencias y scripts
├── package-lock.json              # Lock file
├── .env.example                   # Plantilla de variables
├── .env                           # Variables de entorno
├── .gitignore                     # Archivos ignorados
├── INSTALACION.md                 # Guía de instalación
└── README.md                      # Este archivo
```

---

## 🧩 Componentes Principales

### Flujo de Componentes

```
App (Raíz)
├── BrowserRouter
    └── AuthProvider
        └── AppRouter
            ├── Navbar
            ├── Layout
            │   ├── Routes
            │   │   ├── LoginPage
            │   │   ├── HomePage
            │   │   ├── ProductsPage
            │   │   └── ...
            │   └── Footer
            └── Toaster (Notificaciones)
```

### Componentes Comunes

```jsx
// Button Component
<Button 
  variant="primary" 
  size="lg" 
  onClick={() => {}}
>
  Enviar
</Button>

// Card Component
<Card>
  <CardHeader>Título</CardHeader>
  <CardContent>Contenido</CardContent>
</Card>

// Input Component
<Input 
  type="email" 
  placeholder="tu@email.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

---

## 🔗 Servicios y API

### Cliente Axios

```javascript
// src/services/api.js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Servicios de API

```javascript
// src/services/authService.js
export const loginUser = (username, password) => 
  api.post('/token/', { username, password });

export const registerUser = (data) => 
  api.post('/usuarios/', data);

// src/services/productService.js
export const getProducts = (page = 1) => 
  api.get('/productos/', { params: { page } });

export const createProduct = (data) => 
  api.post('/productos/', data);

export const updateProduct = (id, data) => 
  api.put(`/productos/${id}/`, data);

export const deleteProduct = (id) => 
  api.delete(`/productos/${id}/`);
```

---

## 📦 Scripts Disponibles

### Desarrollo

```bash
npm run dev
```
Inicia el servidor de desarrollo con HMR (Hot Module Replacement).
Accede a http://localhost:5173

### Construcción

```bash
npm run build
```
Crea una versión optimizada para producción en la carpeta `dist/`.

Características:
- Minificación de código
- Tree-shaking de módulos no utilizados
- Optimización de assets
- Generación de source maps

### Preview de Producción

```bash
npm run preview
```
Sirve la versión construida localmente para probar antes de deployar.

### Linting

```bash
npm run lint
```
Ejecuta ESLint para verificar la calidad del código.

```bash
npm run lint -- --fix
```
Arregla automáticamente los errores encontrados.

---

## ⚙️ Configuración del Entorno

### Variables de Entorno (.env)

```env
# API Backend
VITE_API_URL=http://127.0.0.1:8000/api

# Google OAuth
VITE_GOOGLE_CLIENT_ID=tu_client_id_aqui.apps.googleusercontent.com

# Desarrollo
VITE_ENV=development
VITE_DEBUG=true
```

### Configuración de Vite

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Configuración PWA
    })
  ],
})
```

### Configuración de Tailwind

```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

## 🌐 Despliegue

### Despliegue en Vercel (Recomendado)

1. **Push a GitHub:**
   ```bash
   git add .
   git commit -m "feat: Versión final del frontend"
   git push origin master
   ```

2. **Conectar Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Conecta tu repositorio de GitHub
   - Selecciona `Intercambio_de_productos_frontend`

3. **Configurar Variables de Entorno en Vercel:**
   ```
   VITE_API_URL=https://tu-api-backend.com/api
   VITE_GOOGLE_CLIENT_ID=tu_client_id
   ```

4. **Deploy Automático:**
   Vercel deployará automáticamente cada push a master

### Despliegue en Netlify

1. **Crear archivo `netlify.toml`:**
   ```toml
   [build]
   command = "npm run build"
   publish = "dist"

   [[redirects]]
   from = "/*"
   to = "/index.html"
   status = 200
   ```

2. **Conectar Netlify:**
   - Sube a GitHub
   - Ve a [netlify.com](https://netlify.com)
   - Conecta el repositorio
   - Configura variables de entorno

### Despliegue en GitHub Pages

1. **Actualizar vite.config.js:**
   ```javascript
   export default defineConfig({
     base: '/Intercambio_de_productos_frontend/',
     // ...
   })
   ```

2. **Crear workflow de GitHub Actions:**
   ```yaml
   name: Deploy
   on: [push]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - uses: actions/setup-node@v2
         - run: npm install
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

---

## 🤝 Git Workflow

### Actualizar rama principal

```bash
git pull origin master
```

### Crear rama para nueva funcionalidad

```bash
git checkout -b feature/nombre-funcionalidad
```

### Commits semánticos

```bash
git add .
git commit -m "feat: Nueva funcionalidad implementada"
# o
git commit -m "fix: Bug corregido en componente X"
git commit -m "docs: Actualizar documentación"
git commit -m "style: Mejorar estilos CSS"
git commit -m "refactor: Refactorizar código"
```

### Subir rama

```bash
git push origin feature/nombre-funcionalidad
```

### Crear Pull Request

1. Ve a GitHub
2. Crea un PR desde tu rama hacia `master`
3. Describe los cambios en detalle
4. Espera revisión

---

## 🆘 Troubleshooting

### Error: "npm: command not found"
**Solución:** Instala Node.js desde https://nodejs.org/

### Error: "Port 5173 already in use"
**Solución:** Usa otro puerto:
```bash
npm run dev -- --port 5174
```

### Error: "CORS error" al conectar API
**Solución:** Verifica que:
- El backend esté corriendo en http://localhost:8000
- `VITE_API_URL` sea correcto en `.env`
- CORS esté habilitado en settings.py del backend

### Error: "Google OAuth not working"
**Solución:** 
- Verifica `VITE_GOOGLE_CLIENT_ID` en `.env`
- Comprueba que el dominio esté autorizado en Google Cloud Console
- Limpia cache del navegador

### Estilos Tailwind no aplican
**Solución:**
- Verifica que `content` en tailwind.config.js incluya tus rutas
- Reconstruye: `npm run build`
- Limpia caché: Ctrl+Shift+Delete

### Token JWT expirado
**Solución:**
- El app intenta refreshear automáticamente
- Si falla, vuelve a hacer login
- Verifica que el refresh token sea válido

### Assets no cargan en producción
**Solución:**
- Verifica que `base` en vite.config.js sea correcto
- Revisa la consola del navegador (F12)
- Comprueba que los archivos existan en `dist/`

---

## 📊 Estructura de Datos

### Usuario

```javascript
{
  id: 1,
  username: "usuario",
  email: "usuario@email.com",
  alias: "Mi Alias",
  foto_perfil: "https://...",
  es_activo: true,
  fecha_registro: "2026-01-01T12:00:00Z"
}
```

### Producto

```javascript
{
  id: 1,
  titulo: "Libro de Matemáticas",
  descripcion: "Libro en perfecto estado",
  categoria: 1,
  usuario: 1,
  estado: "DISPONIBLE",
  precio: 15.50,
  fecha_publicacion: "2026-01-01T12:00:00Z",
  imagenes: [
    {
      id: 1,
      imagen: "https://...",
      es_principal: true
    }
  ]
}
```

---

## 🎨 Paleta de Colores

| Variable | Color | Uso |
|----------|-------|-----|
| Primary | #007BFF (Azul) | Botones, enlaces primarios |
| Secondary | #F8F9FA (Gris claro) | Fondos secundarios |
| Accent | #FFC107 (Amarillo) | Acentos, destacados |
| Success | #28a745 (Verde) | Acciones exitosas |
| Error | #d4183d (Rojo) | Errores, destructivos |
| Muted | #6C757D (Gris) | Texto secundario |

---

## 🔒 Seguridad

- ✅ JWT para autenticación sin estado
- ✅ HTTPS en producción (obligatorio)
- ✅ CORS configurado correctamente
- ✅ Tokens almacenados en localStorage (seguro para este contexto)
- ✅ Validación en cliente y servidor
- ✅ Input sanitization
- ✅ XSS protection via React

---

## 📞 Soporte y Contacto

- 👨‍💻 **Autor:** José García Martínez-Abarca - Francisco Valcárcel Lardín
- 🎓 **Proyecto:** DAW - Desarrollo Web Intermodular
- 🐛 **Reportar bugs:** Issues en GitHub
- 💬 **Preguntas:** Discussions en GitHub
- 📚 **Backend:** [Intercambio_de_productos](https://github.com/Josegrcia02/Intercambio_de_productos)

---

## 📄 Licencia

Este proyecto es parte del curriculum de **DAW2 (Desarrollo de Aplicaciones Web )**.

---

**Última actualización:** Mayo 2026 | Fase Final ✅

¡Gracias por usar HellinMarket! 🎨✨
