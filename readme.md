# 📚 Plateforme de Mentorat

## Description

La plateforme de mentorat **Pharouqy Mentoors** est une application full-stack permettant aux mentors et aux mentorés de se connecter, d'organiser des sessions de mentorat et d'échanger des messages. Elle est composée d'une interface utilisateur développée en React (Interface_Mentorat) et d'une API backend en Node.js avec Express (Platforme_Mentorat).

## 📁 Structure du Projet

```
pharouqy-mentoors/
├── Interface_Mentorat/    # Frontend (React + Vite)
│   ├── public/            # Fichiers publics
│   ├── src/               # Code source React
│   │   ├── actions/       # Actions Redux
│   │   ├── components/    # Composants réutilisables
│   │   ├── pages/         # Pages principales
│   │   ├── reducers/      # Réducteurs Redux
│   │   └── routes/        # Gestion des routes
│   ├── package.json       # Dépendances et scripts
│   ├── vite.config.js     # Configuration de Vite
│   ├── tailwind.config.js # Configuration de Tailwind CSS
│   ├── .env               # Variables d'environnement
│   ├── .gitignore         # Fichiers ignorés par Git
│   └── README.md          # Documentation du frontend
│
└── Platforme_Mentorat/    # Backend (Node.js + Express + Sequelize)
    ├── config/            # Configuration de la base de données
    ├── controllers/       # Logique métier
    ├── middlewares/       # Middleware d'authentification
    ├── migrations/        # Migrations Sequelize
    ├── models/            # Modèles Sequelize
    ├── routes/            # Routes API
    ├── package.json       # Dépendances et scripts
    ├── .gitignore         # Fichiers ignorés par Git
    └── README.md          # Documentation du backend
```

## 🚀 Fonctionnalités

✅ Inscription et connexion des utilisateurs (mentors & mentorés)  
✅ Création et gestion des sessions de mentorat  
✅ Messagerie entre mentor et mentoré  
✅ Protection des routes avec authentification JWT  
✅ Stockage des informations en base de données SQL avec Sequelize  
✅ Interface utilisateur moderne avec React et Tailwind CSS  

## 🛠️ Installation & Configuration

### 1️⃣ Cloner le dépôt
```bash
git clone https://github.com/votre-repo/pharouqy-mentoors.git
cd pharouqy-mentoors
```

### 2️⃣ Installation des dépendances
#### Frontend :
```bash
cd Interface_Mentorat
npm install
```
#### Backend :
```bash
cd Platforme_Mentorat
npm install
```

### 3️⃣ Configuration des fichiers `.env`
Créer un fichier `.env` dans `Platforme_Mentorat/` avec :
```
DB_NAME=mentors
DB_USER=root
DB_PASSWORD=motdepasse
DB_HOST=localhost
DB_DIALECT=mysql
PORT=4000
JWT_SECRET=secret_key
```
Créer un fichier `.env` dans `Interface_Mentorat/` si nécessaire.

VITE_API_URL=url_of_API

### 4️⃣ Exécution de l'application
#### Démarrer le backend :
```bash
cd Platforme_Mentorat
npm run dev
```

#### Démarrer le frontend :
```bash
cd Interface_Mentorat
npm run dev
```

L'application sera accessible à l'adresse : `http://localhost:5173`

## 🛠 Technologies Utilisées
- **Frontend** : React, Vite, Tailwind CSS
- **Backend** : Node.js, Express, Sequelize, JWT
- **Base de données** : PostgreSQL / MySQL

## 📌 Améliorations futures
- Ajout d'un tableau de bord analytique
- Notifications en temps réel avec WebSockets
- Implémentation d'un calendrier interactif

## 📄 Licence
Ce projet est sous licence **MIT**.

---

👨‍💻 Développé avec ❤️ par **Younsi Farouk** et l'équipe **Pharouqy Mentoors**

