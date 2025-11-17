const { Server } = require('socket.io');
const Message = require('../models/messageModel');
const { store } = require('../controllers/chatController');
const { logEvent } = require('../utils/logger');

function initSocket(server, clientURL) {
  const io = new Server(server, {
    cors: {
      origin: clientURL,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  const typingUsers = {};

  io.on('connection', (socket) => {
    logEvent(`User connected: ${socket.id}`);

    // Handle user joining
    socket.on('user_join', (username) => {
      store.users[socket.id] = { username, id: socket.id };
      io.emit('user_list', Object.values(store.users));
      io.emit('user_joined', { username, id: socket.id });
      logEvent(`${username} joined the chat`);
    });

    // Handle sending messages
    socket.on('send_message', (messageData) => {
      const message = new Message({
        sender: store.users[socket.id]?.username || 'Anonymous',
        senderId: socket.id,
        message: messageData.message,
      });

      store.messages.push(message);
      if (store.messages.length > 100) store.messages.shift();

      io.emit('receive_message', message);
    });

    // Typing indicators
    socket.on('typing', (isTyping) => {
      if (store.users[socket.id]) {
        const username = store.users[socket.id].username;
        if (isTyping) typingUsers[socket.id] = username;
        else delete typingUsers[socket.id];
        io.emit('typing_users', Object.values(typingUsers));
      }
    });

    // Private messages
    socket.on('private_message', ({ to, message }) => {
      const messageData = new Message({
        sender: store.users[socket.id]?.username || 'Anonymous',
        senderId: socket.id,
        message,
        isPrivate: true,
      });
      socket.to(to).emit('private_message', messageData);
      socket.emit('private_message', messageData);
    });

    // Disconnect
    socket.on('disconnect', () => {
      if (store.users[socket.id]) {
        const { username } = store.users[socket.id];
        io.emit('user_left', { username, id: socket.id });
        logEvent(`${username} left the chat`);
      }
      delete store.users[socket.id];
      delete typingUsers[socket.id];
      io.emit('user_list', Object.values(store.users));
      io.emit('typing_users', Object.values(typingUsers));
    });
  });

  return io;
}

module.exports = initSocket;
