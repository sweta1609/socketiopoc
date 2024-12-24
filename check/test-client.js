const io = require('socket.io-client');
const socket = io('https://server.panoplia.io'); // Replace with your server address and port

socket.on('connect', () => {
  console.log('Connected to Socket.IO server');
});

socket.on('newAlert', (data) => {
    console.log('New Alert received:', data);
  });
socket.on('disconnect', () => {
  console.log('Disconnected from Socket.IO server');
});

socket.on('error', (error) => {
  console.error('Socket.IO error:', error);
});
