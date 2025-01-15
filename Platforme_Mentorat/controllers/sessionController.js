// controllers/sessionController.js
const { Session } = require('../models');

// Créer une session de mentorat
exports.createSession = async (req, res) => {
  try {
    const { mentorId, menteeId, date, status } = req.body;
    console.log(req.body);
    if (!mentorId || !menteeId || !date || !status) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    const session = await Session.create({
      mentorId,
      menteeId,
      date,
      status
    });

    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ error: `Erreur lors de la création de la session. ${error}` });
  }
};

// Récupérer toutes les sessions (Admin uniquement)
exports.getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.findAll();
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des sessions.' });
  }
};

// Récupérer une session par son ID (Admin ou Mentor et Mentee associés)
exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findByPk(req.params.id);

    if (!session) {
      return res.status(404).json({ error: 'Session non trouvée.' });
    }

    if (req.user.role !== 'admin' && req.user.id !== session.mentorId && req.user.id !== session.menteeId) {
      return res.status(403).json({ error: 'Accès interdit.' });
    }

    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la session.' });
  }
};

// Mettre à jour une session (Admin, Mentor ou Mentee associés)
exports.updateSession = async (req, res) => {
  try {
    const { date, status } = req.body;

    const session = await Session.findByPk(req.params.id);

    if (!session) {
      return res.status(404).json({ error: 'Session non trouvée.' });
    }

    if (req.user.role !== 'admin' && req.user.id !== session.mentorId && req.user.id !== session.menteeId) {
      return res.status(403).json({ error: 'Accès interdit.' });
    }

    if (date) session.date = date;
    if (status) session.status = status;

    await session.save();

    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la session.' });
  }
};

// Supprimer une session (Admin uniquement)
exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findByPk(req.params.id);

    if (!session) {
      return res.status(404).json({ error: 'Session non trouvée.' });
    }

    await session.destroy();
    res.status(200).json({ message: 'Session supprimée avec succès.' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la session.' });
  }
};
