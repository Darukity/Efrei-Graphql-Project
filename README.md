# Efrei GraphQL Project

## 📌 Présentation
Ce projet est une application full-stack utilisant **GraphQL**.

## 🚀 Technologies utilisées
### Backend
- **Node.js** + **TypeScript**
- **Apollo Server** (GraphQL)
- **Prisma** (ORM)
- **SQLite** (Base de données locale)
- **JWT** (Authentification)

## ✅ Prérequis
Avant de commencer, assure-toi d'avoir installé :
- [Node.js](https://nodejs.org/) (v16+ recommandé)

## 📥 Installation
### Backend
Clone le dépôt et installe les dépendances :
```bash
git clone https://github.com/Darukity/Efrei-Graphql-Project.git
cd backend
npm install
```

## ⚙️ Configuration
Le fichier `.env` contient les variables d'environnement suivantes :

```env
DATABASE_URL="file:./dev.db"  # Chemin de la base de données SQLite
JWT_SECRET="your-secret"  # Clé secrète pour l'authentification JWT
```


## 🛠️ Initialisation de la base de données
Exécute les commandes suivantes pour configurer la base de données avec Prisma :

```bash
npm run  prisma migrate dev --name init
npm run prisma db seed  # Optionnel, pour ajouter des données de test
```

## 🚀 Lancer le serveur
Démarre le serveur GraphQL avec :

```bash
npm run dev  # En mode développement
```
Le serveur GraphQL sera accessible sur **`http://localhost:4000/graphql`**.


## 📌 Déploiement
### 1️⃣ Générer un build production
```bash
npm run build
```

### 2️⃣ Lancer en production
```bash
npm start
```

---
## 🚀 Frontend (À compléter)
