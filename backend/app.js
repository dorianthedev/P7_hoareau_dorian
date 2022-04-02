//---------------Importation----------------//
//importation de express
const express = require('express');

//importation de moragn (logger http)
const morgan = require('morgan');

//importation connexion base de donnée mysql
const mysql = require('./db/db.mysql');

// importation path
const path = require('path');


//importation des routes
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')

//-----------------------------------------//

// pour créer une application express
const app = express();

// logger les requetes et les reponses
app.use(morgan('dev'));


// gérer les problèmes de CORS ( cross-origin request sharing ) = sécurity
// autorisation à tout le monde d'accès à la web api, pas de rejet
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  // d'envoyer des requêtes avec les méthodes mentionnées
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//transformer le corps (body) en json objet javascript réutilisables
app.use(express.json());

// La route authentification (auth)
// api/auth = uri = uri + endpoint = route générale
    app.use('/api/auth', userRoutes);

// la route ajout de sauces
    app.use('/api/post', postRoutes)

//pour accéder aux images du dossier images
    app.use('/images', express.static(path.join(__dirname, 'images')));


// exportation de app.js pour y accéder depuis un autre fichier
module.exports = app;