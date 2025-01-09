const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Token manquant. Accès non autorisé.' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) return res.status(401).json({ error: 'Utilisateur non trouvé.' });
    req.token = token;
    req.user = user; // Attache l'utilisateur authentifié à la requête
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token invalide.' });
  }
};

const authorize = (roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Accès interdit. Rôle insuffisant.' });
    }
    next();
  };
};

module.exports = { authenticate, authorize };