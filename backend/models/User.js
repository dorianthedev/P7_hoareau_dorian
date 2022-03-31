// importation de cryptojs pour chiffrer le mail
const cryptojs = require('crypto-js')
// importation pour utiliser les variables d'environnement
const dotenv = require('dotenv');
const result = dotenv.config();

// impoortation de bcrypt pour hash le password
const bcrypt = require('bcrypt');

class User {
    constructor (email, password){
        this.email = email;
        this.password = password;
    }
    //méthodes pour chiffrer et déchiffrer l'email
    emailChiffrement(){
        // chiffrer l'email avant de l'envoyer de la base de donnée
        const emailCryptoJs = cryptojs.HmacSHA256(this.email, `${process.env.CRYPTOJS_EMAIL}`).toString();
        return emailCryptoJs;
    }
    //méthodes pour HASHER le mdp
    hashPassword = async function() {
        try {
            const hashPassword = bcrypt.hash(this.password, 10);
            return hashPassword;
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = User;