// routes/user.js
const express = require("express");
const { authenticate, authorize } = require("../middlewares/auth");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  login,
  logout,
  register,
} = require("../controllers/userController");

const router = express.Router();

router.get("/logout", logout); // OK

// Endpoint d'inscription publique
router.post("/register", register);

// Récupérer tous les utilisateurs (Admin uniquement)
router.get("/", authenticate, /*authorize(['admin']),*/ getAllUsers); // OK

// Récupérer un utilisateur par son ID (Admin ou l'utilisateur lui-même)
router.get("/:id", authenticate, getUserById); // OK

// Créer un nouvel utilisateur (Admin uniquement)
router.post("/", authenticate, /*authorize(["admin"]),*/ createUser);

router.post("/login", login);

// Mettre à jour un utilisateur (Admin ou l'utilisateur lui-même)
router.put("/:id", authenticate, updateUser);

// Supprimer un utilisateur (Admin uniquement)
router.delete("/:id", authenticate, authorize(["admin"]), deleteUser);

module.exports = router;
