import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider'; // Asegúrate de que esta ruta sea correcta
import AppRouter from './routes/AppRouter';

function App() {
  return (
    // 1. BrowserRouter habilita la navegación (Link, Routes)
    <BrowserRouter>
      {/* 2. AuthProvider permite que 'useAuth' funcione en el Perfil */}
      <AuthProvider>
        {/* 3. AppRouter decide qué página mostrar */}
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;