import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuthStore } from '../store/authStore';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { isAuthenticated, token, user } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && token && user) {
      const socketIO = io(import.meta.env.VITE_APP_SOCKET_URL || 'http://localhost:5000', {
        auth: {
          token,
        },
      });

      socketIO.on('connect', () => {
        // Join user-specific room for notifications
        socketIO.emit('join_room', user._id || user.id);
      });

      setSocket(socketIO);

      return () => {
        socketIO.disconnect();
      };
    }
  }, [isAuthenticated, token, user]);

  const value = { socket };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  const context = React.useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider');
  }
  return context;
};
