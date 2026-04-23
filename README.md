# 🎨 Frontend - Plataforma de Intercambio

Interfaz de usuario construida con **React**, **Vite** y **JavaScript (SWC)**.

## 📋 Requisitos Previos

Necesitas tener instalado **Node.js** en tu ordenador.

1. Abre una terminal y escribe: `node -v`

2. Si no sale versión (ej: v18.x or v20.x), descárgalo en [nodejs.org](https://nodejs.org/).

## 🚀 Guía de Inicio Rápido

Sigue estos pasos la primera vez que descargues el proyecto:

### 1. Entrar en la carpeta

Asegúrate de estar en el directorio del frontend:

```bash
cd intercambio-frontend
```

### 2. Instalar las "Tuercas" (Dependencias)
Este comando lee el package.json y descarga todas las librerías necesarias (React, Router, Axios, etc.) en tu carpeta local node_modules.

```Bash
npm install
```

### 3. Arrancar el Servidor de Desarrollo

Esto iniciará Vite en modo ultra-rápido.

```Bash
npm run dev
```

Abra su navegador en: http://localhost:5173/

## 🛠️ Estructura del Proyecto

src/services/: Aquí están las llamadas a la API (Django).

src/pages/: Aquí están las pantallas completas (Login, Home).

src/components/: Piezas reutilizables (Botones, Navbar).

## 🤝 Comandos Útiles

npm run dev: Inicia el servidor local.

npm run build: Genera la versión optimizada para producción (carpeta dist).

npm run preview: Previsualiza la versión de producción localmente.

# 📂 Arquitectura del Frontend (React + Vite)

Este documento detalla la estructura de directorios y la responsabilidad de cada módulo en el cliente web. La arquitectura sigue principios de **Component-Based Architecture** y **Separation of Concerns (SoC)**.

---

## 🏗️ Estructura de Directorios

```text
intercambio-frontend/
├── node_modules/          <-- Dependencias instaladas (Ignorado en Git)
├── public/                <-- Archivos estáticos públicos
├── src/                   <-- Código fuente de la aplicación
│   ├── assets/            <-- Recursos multimedia y estilos globales
│   ├── components/        <-- Bloques de construcción de UI
│   │   ├── common/        <-- Elementos atómicos (Botones, Inputs)
│   │   └── layout/        <-- Estructura de página (Navbar, Footer)
│   ├── context/           <-- Estado global (Auth, Theme)
│   ├── hooks/             <-- Lógica reutilizable (Custom Hooks)
│   ├── pages/             <-- Vistas completas (Rutas)
│   ├── routes/            <-- Configuración de navegación
│   ├── services/          <-- Capa de conexión con API (Backend)
│   ├── App.jsx            <-- Componente Raíz
│   └── main.jsx           <-- Punto de entrada (Mount point)
├── .env                   <-- Variables de entorno
├── index.html             <-- HTML base
├── package.json           <-- Manifiesto de dependencias y scripts
└── vite.config.js         <-- Configuración del compilador
