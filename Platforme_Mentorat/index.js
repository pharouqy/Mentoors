const express = require('express');
const app = express();
require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');

// Import des routes
const sessionRoutes = require('./routes/sessions');
const messageRoutes = require('./routes/messages');
const userRoutes = require('./routes/user');
const sequelize = require('./config/db');  // Import de la configuration Sequelize

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.set('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

app.use(cors()); // Active les en-têtes CORS par défaut

app.use(helmet());

app.disable('x-powered-by');

// Utilisation des routes
app.use('/api/sessions', sessionRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes); // Routes pour la gestion des utilisateurs

app.get("/",(req, res, next) => {
  res.status(200).json({message: "reussie !"});
})

// Synchronisation avec la base de données
sequelize.sync({ force: false })  // force: false pour ne pas supprimer les données existantes
  .then(() => {
    console.log('Base de données synchronisée');
  })
  .catch((error) => {
    console.error('Erreur lors de la synchronisation de la base de données :', error);
  });

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
