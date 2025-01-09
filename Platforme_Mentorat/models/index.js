// Importer Sequelize
const Sequelize = require('sequelize');
const sequelize = require('../config/db');  // Connexion à la base de données

const db = {};

// Ajout de Sequelize et sequelize à l'objet db
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Chargement des modèles
db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.Session = require('./session')(sequelize, Sequelize.DataTypes);
db.Message = require('./message')(sequelize, Sequelize.DataTypes);

// Définition des associations (si elles existent)
db.User.associate(db);
db.Session.associate(db);
db.Message.associate(db);

module.exports = db;

