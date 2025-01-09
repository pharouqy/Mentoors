// config/db.js
const { Sequelize } = require('sequelize');

// Configuration de la base de données
const sequelize = new Sequelize({
  dialect: 'mysql',  // ou 'postgres' si tu utilises PostgreSQL
  host: process.env.DB_HOST,  // Hôte de la base de données
  username: process.env.DB_USER,  // Utilisateur de la base de données
  password: process.env.DB_PASSWORD,  // Mot de passe de l'utilisateur
  database: process.env.DB_NAME,  // Nom de la base de données
  logging: false,  // Désactiver le logging des requêtes SQL (peut être activé pour le débogage)
});

module.exports = sequelize;
