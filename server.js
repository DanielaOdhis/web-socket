const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const messages = [];

wss.on('connection', (socket) => {
  socket.send(JSON.stringify(messages));

  socket.on('message', (data) => {
    const message = JSON.parse(data);
    messages.push({
      message: message.message,
      time: Date.now(),
    });

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify([messages[messages.length - 1]]));
      }
    });
  });
});

server.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
