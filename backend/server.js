// importer le package http de node.js pour avoir les outils pour créer le server
const http = require('http');

// importer application app.js
const app = require('./app');

// importer le package pour utiliser les variables d'env
const dotenv = require('dotenv');
const result = dotenv.config();
//----------------------------------------------------//

// renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne 
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT ||'3000');
app.set('port', port);

// recherche les différentes erreurs et les gère de manière appropriée. 
//Elle est ensuite enregistrée dans le serveur

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};


// la méthode createserver prend en argument la fonction 
//qui sera appelé à chaque requête reçu par le server.
//Ici les fonctions seront dans app.js

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});


//le server écoute les requêtes sur le port
server.listen(port);