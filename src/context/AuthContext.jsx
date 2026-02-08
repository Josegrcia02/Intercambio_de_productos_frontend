import { createContext, useContext } from 'react';

// 1. Creamos el contexto (la "caja" donde guardamos los datos)
export const AuthContext = createContext();

// 2. Creamos el hook personalizado (ESTO ES LO QUE TE FALTABA)
// Esta función permite que tus páginas pidan los datos del usuario fácilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};