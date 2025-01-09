const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

// Créer un nouvel utilisateur (Admin uniquement)
exports.createUser = async (req, res) => {
  console.log(req.body);
  try {
    const { firstName, lastName, email, password, role } = req.body;

    if (!lastName || !firstName || !email || !password || !role) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la création de l'utilisateur." });
  }
};

// Récupérer tous les utilisateurs (Admin uniquement)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des utilisateurs." });
  }
};

// Récupérer un utilisateur par son ID (Admin ou l'utilisateur lui-même)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    // Vérifier si l'utilisateur est admin
    if (req.user.role === "admin") {
      return res.json(user);
    }

    // Pour les utilisateurs non-admin, ils ne peuvent voir que leurs propres données
    if (req.user.id !== parseInt(req.params.id)) {
      return res.status(403).json({
        error:
          "Vous n'êtes pas autorisé à accéder aux données d'autres utilisateurs.",
      });
    }

    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de l'utilisateur." });
  }
};

// Mettre à jour un utilisateur (Admin ou l'utilisateur lui-même)
exports.updateUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    if (req.user.role !== "admin" && req.user.id !== user.id) {
      return res.status(403).json({ error: "Accès interdit." });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    if (username) user.username = username;
    if (email) user.email = email;
    if (role) user.role = role;

    await user.save();

    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de l'utilisateur." });
  }
};

// Supprimer un utilisateur (Admin uniquement)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    await user.destroy();
    res.status(200).json({ message: "Utilisateur supprimé avec succès." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de l'utilisateur." });
  }
};

// Fonction de login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Email et mot de passe sont requis." });
  }

  try {
    // Chercher l'utilisateur par son email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Utilisateur non trouvé." });
    }

    // Comparer le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Mot de passe incorrect." });
    }

    // Créer un token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Connexion réussie.",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      token: token,
    });
  } catch (error) {
    res.status(500).json({ error: `Erreur lors de la connexion. ${error}` });
  }
};

// Fonction de logout
exports.logout = (req, res) => {
  // Le logout est géré côté client en supprimant le token
  res.json({ message: "Déconnexion réussie." });
};
