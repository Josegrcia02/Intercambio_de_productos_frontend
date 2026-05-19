import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Lock, LogIn, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

// IMPORTACIONES DE UI
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, loginWithGoogle } = useAuth();
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

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle(credentialResponse.credential);
      // Navigation is handled inside loginWithGoogle on success
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Error al iniciar sesión con Google.');
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Error de comunicación con Google.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <Card className="w-full max-w-md border-0 shadow-2xl overflow-hidden bg-white/80 backdrop-blur-xl relative z-10 transition-all duration-300 hover:shadow-blue-500/10">
        
        {/* Header Azul personalizado dentro del Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-10 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="w-24 h-24 flex items-center justify-center mx-auto mb-4 transform group-hover:scale-105 transition-transform duration-300">
            <img src="/logo.png" alt="HellinMarket Logo" className="w-full h-full object-contain drop-shadow-md" />
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">HellinMarket</h2>
          <p className="text-blue-100 text-sm mt-2 font-medium">Inicia sesión para descubrir, vender e intercambiar</p>
        </div>

        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {error && (
              <div className="bg-destructive/10 text-destructive p-4 rounded-xl text-sm flex items-center gap-3 border border-destructive/20 animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={18} className="shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* Input Usuario */}
            <div className="space-y-2 group">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">NRE (Usuario MurciaEduca)</label>
              <div className="relative transition-all duration-300 group-focus-within:shadow-md rounded-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-blue-600 transition-colors">
                  <User className="h-5 w-5" />
                </div>
                <Input
                  type="text"
                  placeholder="Tu NRE"
                  className="pl-11 bg-gray-50/50 border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-blue-500 transition-all h-12"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Input Contraseña */}
            <div className="space-y-2 group">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Contraseña</label>
              <div className="relative transition-all duration-300 group-focus-within:shadow-md rounded-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-blue-600 transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-11 bg-gray-50/50 border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-blue-500 transition-all h-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 text-md font-semibold transition-all hover:-translate-y-0.5" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Entrar con NRE
                </>
              )}
            </Button>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-sm font-medium">O continua con</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <div className="flex justify-center transform hover:scale-[1.02] transition-transform duration-300">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                shape="rectangular"
                theme="outline"
                text="signin_with"
                size="large"
                logo_alignment="center"
                width="100%"
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;