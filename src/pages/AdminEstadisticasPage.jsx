import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, HandCoins, Gift } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { PieChart, Pie, Cell, Tooltip as PieTooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip } from 'recharts';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const COLORS = ['#22c55e', '#a855f7']; // Green for Free, Purple for Paid

const AdminEstadisticasPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState([]);

  const [periodo, setPeriodo] = useState('all');
  const [categoria, setCategoria] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  // Initial fetch categories
  useEffect(() => {
    if (user?.is_staff) {
      fetchCategorias();
    }
  }, [user]);

  useEffect(() => {
    if (user && !user.is_staff) {
      navigate('/');
      return;
    }

    if (user?.is_staff) {
      if (periodo !== 'custom' || (fechaInicio && fechaFin)) {
        fetchEstadisticas();
      }
    }
  }, [user, navigate, periodo, categoria, fechaInicio, fechaFin]);

  const fetchCategorias = async () => {
    try {
      const res = await api.get('/categorias');
      setCategorias(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEstadisticas = async () => {
    try {
      setLoading(true);
      let query = `/intercambios/estadisticas?periodo=${periodo}&categoria=${categoria}`;
      if (periodo === 'custom') {
        query += `&fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`;
      }
      const res = await api.get(query);
      setStats(res.data);
    } catch (error) {
      console.error(error);
      toast.error('Error al cargar estadísticas');
    } finally {
      setLoading(false);
    }
  };

  if (!user || !user.is_staff) return null;

  const pieData = stats ? [
    { name: 'Gratuitos', value: stats.gratuitos },
    { name: 'De Pago', value: stats.de_pago }
  ] : [];

  return (
    <div className="container mx-auto p-4 max-w-6xl pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
            <BarChart3 size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Estadísticas de Intercambio</h1>
            <p className="text-gray-500 text-sm">Analiza el rendimiento de la plataforma.</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            className="border border-gray-200 bg-white p-2 rounded-lg text-sm"
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
          >
            <option value="all">Histórico Completo</option>
            <option value="7d">Últimos 7 días</option>
            <option value="30d">Últimos 30 días</option>
            <option value="365d">Último año</option>
            <option value="custom">Rango Personalizado</option>
          </select>

          {periodo === 'custom' && (
            <div className="flex items-center gap-2">
              <input
                type="date"
                className="border border-gray-200 bg-white p-2 rounded-lg text-sm"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
              />
              <span className="text-gray-500">-</span>
              <input
                type="date"
                className="border border-gray-200 bg-white p-2 rounded-lg text-sm"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
              />
            </div>
          )}

          <select
            className="border border-gray-200 bg-white p-2 rounded-lg text-sm"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      {loading || !stats ? (
        <div className="flex justify-center p-20">Cargando datos...</div>
      ) : (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white border-blue-100 shadow-sm">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1 font-medium">Total Intercambios</p>
                  <h3 className="text-3xl font-bold text-gray-900">{stats.total}</h3>
                </div>
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                  <TrendingUp size={24} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-green-100 shadow-sm">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1 font-medium">Intercambios / Gratis</p>
                  <h3 className="text-3xl font-bold text-gray-900">{stats.gratuitos}</h3>
                </div>
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                  <Gift size={24} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-purple-100 shadow-sm">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1 font-medium">Ventas (Pago)</p>
                  <h3 className="text-3xl font-bold text-gray-900">{stats.de_pago}</h3>
                </div>
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
                  <HandCoins size={24} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pie Chart */}
            <Card className="col-span-1 shadow-sm">
              <div className="p-4 border-b font-bold text-gray-700">Distribución de Tipos</div>
              <CardContent className="p-4 flex items-center justify-center h-80">
                {stats.total > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <PieTooltip formatter={(value) => [`${value} items`, 'Cantidad']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-gray-400">Sin datos para mostrar</p>
                )}
              </CardContent>
            </Card>

            {/* Bar Chart */}
            <Card className="col-span-1 lg:col-span-2 shadow-sm">
              <div className="p-4 border-b font-bold text-gray-700">Evolución en el tiempo</div>
              <CardContent className="p-4 h-80">
                {stats.evolucion && stats.evolucion.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.evolucion} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="fecha" />
                      <YAxis allowDecimals={false} />
                      <BarTooltip cursor={{ fill: '#f3f4f6' }} />
                      <Bar dataKey="total" fill="#3b82f6" name="Intercambios Realizados" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-400">Sin intercambios en este período</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminEstadisticasPage;
