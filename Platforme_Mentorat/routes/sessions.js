// routes/session.js
const express = require('express');
const { authenticate, authorize } = require('../middlewares/auth');
const {
  createSession,
  getAllSessions,
  getSessionById,
  updateSession,
  deleteSession
} = require('../controllers/sessionController');
const router = express.Router();

// Créer une session de mentorat
router.post('/', authenticate, createSession);

// Récupérer toutes les sessions (Admin uniquement)
router.get('/', authenticate, /*authorize(['admin']),*/ getAllSessions);

// Récupérer une session par son ID
router.get('/:id', authenticate, getSessionById);

// Mettre à jour une session
router.put('/:id', authenticate, updateSession);

// Supprimer une session (Admin uniquement)
router.delete('/:id', authenticate, authorize(['admin']), deleteSession);

module.exports = router;
