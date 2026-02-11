# Guía de Inicio - IntercambioIES Frontend

## Requisitos Previos

* **Node.js**: Versión 16 o superior instalada.
* **Backend**: El servidor Django debe estar en ejecución (por defecto en el puerto 8000).

## Pasos para iniciar

### 1. Instalar dependencias

Abre una terminal en la carpeta raíz del proyecto y ejecuta el siguiente comando para descargar las librerías necesarias:

```bash
npm install

```

### 2. Verificar conexión con el Backend

El frontend intenta conectarse al backend en una dirección local específica. Abre el archivo `src/services/api.js` y asegúrate de que la `baseURL` coincida con la dirección de tu servidor Django:

```javascript
// src/services/api.js
baseURL: 'http://127.0.0.1:8000/api',

```

### 3. Ejecutar el servidor de desarrollo

Una vez instaladas las dependencias y verificado el backend, inicia la aplicación con:

```bash
npm run dev

```

La terminal mostrará la URL local (normalmente `http://localhost:5173`) donde puedes ver la web en tu navegador.