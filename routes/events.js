const express = require('express');
const router = express.Router();
const { getClientStream, addClient, removeClient } = require('../utils/eventManager');

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Add client to the list of clients
  const clientId = addClient(res);

  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };
  
  // Send a message every 5 seconds
  const interval = setInterval(() => {
    const eventData = {
      message: 'Hello world!',
      timestamp: new Date().toLocaleTimeString()
    };
    sendEvent(eventData);
  }, 10000);

  // Handle client disconnect
  req.on('close', () => {
    clearInterval(interval);
    removeClient(clientId);
  });
});

router.post('/send', (req, res) => {
  // Send a message to all connected clients
  getClientStream().forEach(client => {
    client.write(`data: ${JSON.stringify({ message: 'Custom event triggered!', timestamp: new Date().toLocaleTimeString() })}\n\n`);
  });
  res.sendStatus(200);
});

module.exports = router;
