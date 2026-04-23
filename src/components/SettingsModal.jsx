import React, { useState } from 'react';
import { X, Save, Lock, User } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

// UI Components
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';

const SettingsModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [alias, setAlias] = useState(user?.alias || user?.username || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dataToSend = { alias };
    if (password.trim()) {
        dataToSend.password = password;
    }

    try {
      await api.patch('/usuarios/me', dataToSend);
      toast.success("¡Perfil actualizado! Recarga la página para ver los cambios.");
      onClose();
      setTimeout(() => {
        window.location.reload(); 
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el perfil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
      <Card className="w-full max-w-md relative animate-in zoom-in-95 shadow-2xl border-0">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-6 pb-2 border-b">
          <h2 className="text-xl font-bold">Configuración de Cuenta</h2>
          <p className="text-sm text-muted-foreground">Personaliza cómo te ven los demás.</p>
        </div>

        <CardContent className="p-6 pt-4">
          <form onSubmit={handleSave} className="space-y-4">
            
            {/* CAMBIAR ALIAS */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <User size={16} /> Nombre Visible (Alias)
              </label>
              <Input 
                value={alias} 
                onChange={(e) => setAlias(e.target.value)} 
                placeholder="Ej: Juan Guitarrista" 
              />
              <p className="text-xs text-muted-foreground">
                Tu usuario de acceso (NRE) seguirá siendo: <strong>{user?.username}</strong>
              </p>
            </div>

            <hr className="border-gray-100" />

            {/* CAMBIAR CONTRASEÑA */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Lock size={16} /> Nueva Contraseña
              </label>
              <Input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Déjalo vacío para no cambiarla" 
              />
            </div>

            <div className="pt-4 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Guardando..." : <><Save size={16} className="mr-2"/> Guardar Cambios</>}
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsModal;