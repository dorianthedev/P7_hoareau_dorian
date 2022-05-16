//importation de jsonwebtoken
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const result = dotenv.config();
//exportation de la fonction du middleware

module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, `${process.env.JWT_KEY_TOKEN}`);      
      const userId = decodedToken.userId;
              
      res.locals.userId = userId; // renvoyer au controller suivant
      res.locals.token = token;
      res.locals.admin = decodedToken.admin

      
        next();
      
    } catch {
      res.status(401).json({
        message: "Echec d'authentification",
        error: new Error('Invalid request!')
      });
    }
  };

  