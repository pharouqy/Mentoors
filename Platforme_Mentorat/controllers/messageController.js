// controllers/messageController.js
const { Message } = require('../models');

// Envoyer un message dans une session
exports.sendMessage = async (req, res) => {
  try {
    const { sessionId, senderId, content } = req.body;

    if (!sessionId || !senderId || !content) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    const message = await Message.create({
      sessionId,
      senderId,
      content
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'envoi du message.' });
  }
};

// Récupérer tous les messages d'une session
exports.getMessagesBySession = async (req, res) => {
  try {
    const sessionId = req.params.sessionId;

    const messages = await Message.findAll({
      where: { sessionId }
    });

    if (!messages) {
      return res.status(404).json({ error: 'Aucun message trouvé pour cette session.' });
    }

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des messages.' });
  }
};
