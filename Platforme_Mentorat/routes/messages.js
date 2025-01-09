// routes/message.js
const express = require('express');
const { authenticate } = require('../middlewares/auth');
const {
  sendMessage,
  getMessagesBySession
} = require('../controllers/messageController');
const router = express.Router();

// Envoyer un message
router.post('/', authenticate, sendMessage);

// Récupérer tous les messages d'une session
router.get('/:sessionId', authenticate, getMessagesBySession);

module.exports = router;
