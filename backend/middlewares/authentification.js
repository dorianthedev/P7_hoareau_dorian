//importation de jsonwebtoken
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const result = dotenv.config();
//exportation de la fonction du middleware

module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      console.log(req.body);
      console.log("token auth");
      console.log(token);

      const decodedToken = jwt.verify(token, `${process.env.JWT_KEY_TOKEN}`);
      const userId = decodedToken.userId;
        console.log("decoded token");
        console.log(decodedToken);
        

      if (req.body.userId == userId) {
        next();
        
      } else {
        throw 'Invalid user ID';

      }
    } catch {
      res.status(401).json({
        message: "Echec d'authentification",
        error: new Error('Invalid request!')
      });
    }
  };