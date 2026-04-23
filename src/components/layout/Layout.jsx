import React from 'react';
import { Outlet } from 'react-router-dom';
import { DesktopNav } from './DesktopNav';
import { BottomNav } from './BottomNav';

//
const Layout = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navegación Escritorio */}
      <DesktopNav />

      {/* Contenido Principal */}
      <div className="md:ml-64 min-h-screen flex flex-col pb-16 md:pb-0">
        {/* Asegúrate de que esta línea tenga 'bg-muted/30' */}
        <main className="flex-1 w-full h-full bg-muted/30"> 
            <Outlet />
        </main>
      </div>

      {/* Navegación Móvil */}
      <BottomNav />
    </div>
  );
};

export default Layout;