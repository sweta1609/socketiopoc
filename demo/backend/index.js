const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = 3001;

let data = [
  { name: 'A', value: 10 },
  { name: 'B', value: 20 },
  { name: 'C', value: 15 },
  { name: 'D', value: 25 },
];

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.emit('initialData', data);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// GET endpoint to add new data
app.get('/addData', (req, res) => {
  const { name, value } = req.query;
  if (!name || !value) {
    return res.status(400).json({ error: 'Both name and value are required' });
  }

  const newItem = { name, value: parseInt(value, 10) };
  data.push(newItem);

  // Emit the updated data to all connected clients
  io.emit('dataUpdate', data);

  res.json({ message: 'Data added successfully', data });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));