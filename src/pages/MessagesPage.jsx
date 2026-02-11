import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Search, Loader2, Send, ArrowLeft, Trash2 } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

// IMPORTACIONES UI
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';

const MessagesPage = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null); // Esto controla el chat de la derecha
  const [messages, setMessages] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingChat, setLoadingChat] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  const scrollRef = useRef(null);

  // 1. Cargar lista de chats al entrar
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoadingList(true);
        
        const response = await api.get('/mensajes/conversaciones'); 
        setConversations(response.data);
      } catch (error) {
        console.error("Error cargando lista:", error);
      } finally {
        setLoadingList(false);
      }
    };
    fetchConversations();
  }, []);

  // 2. Cargar mensajes cuando cambie el chat seleccionado
  useEffect(() => {
  if (!selectedChat) return;

  const fetchMessages = async () => {
    try {
      setLoadingChat(true);
      
      const response = await api.get(`/mensajes`, {
        params: {
          otro_usuario: selectedChat.otro_usuario.id,
          producto: selectedChat.producto_id
        }
      });
      const rawMessages = Array.isArray(response.data) ? response.data : [];
      
      const sortedMessages = rawMessages.sort((a, b) => 
          new Date(a.fecha_envio) - new Date(b.fecha_envio)
        );

        setMessages(sortedMessages);
    } catch (error) {
      console.error("Error cargando mensajes:", error);
    } finally {
      setLoadingChat(false);
    }
  };

  fetchMessages();
}, [selectedChat]);

  const handleDeleteChat = async () => {
  if (!selectedChat) return;

  const confirmar = window.confirm(
    `¿Estás seguro de que quieres borrar el chat con ${selectedChat.otro_usuario.username}? Se borrará para ambos.`
  );

  if (confirmar) {
    try {
      const url = `/mensajes/borrar_chat?otro_usuario=${selectedChat.otro_usuario.id}&producto=${selectedChat.producto_id}`;
      
      await api.delete(url);

      // 1. Limpiamos el chat seleccionado
      setSelectedChat(null);
      setMessages([]);

      // 2. Actualizamos la lista de conversaciones de la izquierda para que desaparezca
      setConversations(prev => prev.filter(c => 
        !(c.otro_usuario.id === selectedChat.otro_usuario.id && c.producto_id === selectedChat.producto_id)
      ));

      alert("Chat eliminado correctamente.");
    } catch (error) {
      console.error("Error al borrar el chat:", error);
      alert("No se pudo eliminar el chat.");
    }
  }
};

  // Auto-scroll al final
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    try {
      const response = await api.post('/mensajes', {
        receptor: selectedChat.otro_usuario.id,
        producto: selectedChat.producto_id,
        contenido: newMessage
      });
      
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error enviando mensaje:", error);
    }
  };

  const filteredChats = conversations.filter(c => 
    c.otro_usuario.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-64px)] flex bg-white overflow-hidden">
      
      {/* --- PARTE IZQUIERDA: LISTA DE CHATS --- */}
      {/* En móviles se oculta si hay un chat seleccionado */}
      <div className={`${selectedChat ? 'hidden md:flex' : 'flex'} w-full md:w-1/3 border-r border-gray-200 flex-col`}>
        <div className="p-4 border-b bg-gray-50/50">
          <h1 className="text-xl font-bold mb-4">Mensajes</h1>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar chat..." 
              className="w-full pl-10 pr-4 py-2 bg-white border rounded-xl text-sm outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loadingList ? (
            <div className="flex justify-center p-10"><Loader2 className="animate-spin text-blue-500" /></div>
          ) : filteredChats.length === 0 ? (
            <p className="p-10 text-center text-gray-400 text-sm">No tienes conversaciones.</p>
          ) : (
            filteredChats.map((chat) => (
              <div 
                key={`${chat.otro_usuario.id}-${chat.producto_id}`}
                onClick={() => setSelectedChat(chat)} // IMPORTANTE: Solo cambiamos el estado
                className={`p-4 border-b cursor-pointer flex gap-3 items-center transition-colors ${selectedChat?.otro_usuario.id === chat.otro_usuario.id && selectedChat?.producto_id === chat.producto_id ? 'bg-blue-50 border-l-4 border-l-blue-600' : 'hover:bg-gray-50'}`}
              >
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                  {chat.otro_usuario.username.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-gray-900 truncate">{chat.otro_usuario.username}</h3>
                    <span className="text-[10px] text-gray-400">{chat.fecha}</span>
                  </div>
                  <p className="text-xs text-blue-600 font-medium truncate">{chat.producto_titulo}</p>
                  <p className="text-sm text-gray-500 truncate">{chat.ultimo_mensaje}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* --- PARTE DERECHA: EL CHAT ACTIVO --- */}
      <div className={`${!selectedChat ? 'hidden md:flex' : 'flex'} flex-1 flex-col bg-gray-50`}>
        {selectedChat ? (
          <>
            {/* Header del Chat */}
            <div className="p-4 bg-white border-b flex items-center justify-between shadow-sm z-10">
              <div className="flex items-center gap-3">
                <button onClick={() => setSelectedChat(null)} className="md:hidden p-2 -ml-2 text-gray-400">
                  <ArrowLeft size={20} />
                </button>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                  {selectedChat.otro_usuario.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">{selectedChat.otro_usuario.username}</h2>
                  <p className="text-xs text-blue-500 font-medium">{selectedChat.producto_titulo}</p>
                </div>
              </div>
              {/* BOTÓN DE BORRAR */}
              <button 
                onClick={handleDeleteChat}
                className="p-2 text-gray-400 text-red-500 hover:bg-red-50 rounded-full transition-all"
                title="Borrar conversación"
              >
                <Trash2 size={20} />
              </button>
            </div>

            {/* Burbujas de Mensaje */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f0f2f5]">
              {loadingChat ? (
                <div className="flex justify-center p-10"><Loader2 className="animate-spin text-blue-300" /></div>
              ) : (
                messages.map((m) => (
                  <div key={m.id} className={`flex ${m.emisor === user?.id ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] p-3 rounded-2xl text-sm shadow-sm ${
                      m.emisor === user?.id 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                    }`}>
                      <p>{m.contenido}</p>
                      <p className={`text-[9px] mt-1 opacity-70 text-right`}>
                        {new Date(m.fecha_envio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))
              )}
              <div ref={scrollRef} />
            </div>

            {/* Input para responder */}
            <form onSubmit={handleSendReply} className="p-4 bg-white border-t flex gap-2">
              <input 
                type="text" 
                placeholder="Escribe un mensaje..."
                className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button 
                type="submit" 
                disabled={!newMessage.trim()}
                className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 disabled:bg-gray-300 transition-colors shadow-md"
              >
                <Send size={18} />
              </button>
            </form>
          </>
        ) : (
          /* Pantalla de bienvenida cuando no hay nada seleccionado */
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
            <div className="w-24 h-24 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-6">
              <MessageCircle className="w-12 h-12 text-blue-100" />
            </div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">Tus conversaciones</h2>
            <p className="text-sm max-w-xs">Selecciona un chat de la lista para ver los mensajes y acordar el intercambio.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;