const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const messages = [
  { message: "Hello", time: Date.now() },
  { message: "How's it going?", time: Date.now() },
  { message: "Hope you're enjoying the chat!", time: Date.now() },
  { message: "Feel free to ask any questions.", time: Date.now() },
];

wss.on('connection', (socket) => {
  let index = 0;

  const sendNextMessage = () => {
    if (index < messages.length) {
      socket.send(JSON.stringify(messages[index]));
      index++;
      setTimeout(sendNextMessage, 30000);
    }
  };

  sendNextMessage();

  socket.on('close', () => {
    console.log('Connection closed.');
  });
});

server.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
