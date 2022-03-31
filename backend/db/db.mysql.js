//importation  du packege pour utiliser les variables d'environnment
const dotenv = require("dotenv");
const result = dotenv.config();

//importer mysql
const mysql = require("mysql");

// les params de connection base de donnée mysql
const mysqlconnection = mysql.createConnection({
    host: 'localhost',
    database:'groupomania',
    user: 'root',
    password: ''
});

// la connexion à la base de donnée
mysqlconnection.connect((err) => {
    if (err) {
        console.log(`error connection: ${err.stack}`)
    } else {
        console.log('connecté à la base de donnée')
        console.log(`connected as id ${mysqlconnection.threadId}`);
    }
})

module.exports = mysqlconnection;