import { Server } from "socket.io";

const configureSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // Socket.IO event handlers
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Chat events
    socket.on('send_message', (data) => {
      io.to(data.roomId).emit('receive_message', {
        senderId: data.senderId,
        message: data.message,
        timestamp: new Date(),
      });
    });

    // Join room
    socket.on('join_room', (roomId) => {
      socket.join(roomId);
      io.to(roomId).emit('user_joined', { userId: socket.id });
    });

    // Leave room
    socket.on('leave_room', (roomId) => {
      socket.leave(roomId);
      io.to(roomId).emit('user_left', { userId: socket.id });
    });

    // Notification events
    socket.on('send_notification', (data) => {
      io.to(data.userId).emit('receive_notification', {
        type: data.type,
        message: data.message,
        timestamp: new Date(),
      });
    });

    // Disconnect
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
};

export default configureSocket;
