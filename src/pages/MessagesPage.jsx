import React from 'react';
import { MessageCircle } from 'lucide-react';

const MessagesPage = () => {
  // Datos simulados para ver el diseño
  const conversations = [
    { id: 1, user: "Ana García", lastMsg: "¿Sigue disponible la calculadora?", time: "2 min" },
    { id: 2, user: "Carlos Ruiz", lastMsg: "¡Genial! Nos vemos en la biblioteca", time: "1 h" },
  ];

  return (
    <div className="h-[calc(100vh-theme(spacing.16))] md:h-screen flex flex-col md:flex-row">
      {/* Lista de Chats */}
      <div className="w-full md:w-1/3 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold">Mensajes</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((chat) => (
            <div key={chat.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer flex gap-3 items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                {chat.user.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium truncate">{chat.user}</h3>
                  <span className="text-xs text-gray-500">{chat.time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{chat.lastMsg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Área de Chat (Vacía por ahora) */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50 text-gray-500 flex-col">
        <MessageCircle className="w-16 h-16 mb-4 text-gray-300" />
        <p>Selecciona una conversación para empezar</p>
      </div>
    </div>
  );
};

export default MessagesPage;