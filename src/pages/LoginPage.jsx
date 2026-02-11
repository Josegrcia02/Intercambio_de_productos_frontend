import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Lock, LogIn, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// IMPORTACIONES DE UI
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/'); 
    } catch (err) {
      console.error(err);
      setError('Usuario o contraseña incorrectos.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md border-gray-100 shadow-xl overflow-hidden">
        
        {/* Header Azul personalizado dentro del Card */}
        <div className="bg-primary p-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">¡Hola de nuevo!</h2>
          <p className="text-blue-100 text-sm mt-1">Introduce tus datos para entrar</p>
        </div>

        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {error && (
              <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm flex items-center gap-2 border border-destructive/20">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {/* Input Usuario */}
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">NRE (Usuario MurciaEduca)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <User className="h-4 w-4" />
                </div>
                <Input
                  type="text"
                  placeholder="Tu nombre de usuario"
                  className="pl-10" // Padding para dejar sitio al icono
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Input Contraseña */}
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <Lock className="h-4 w-4" />
                </div>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading} size="lg">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;