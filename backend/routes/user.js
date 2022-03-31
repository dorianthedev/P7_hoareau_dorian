// importation express pour utiliser les outils express
const express = require('express')
//importation du controllers/user.js
const userController = require('../controllers/user');
//importation du middleware/password
const password = require('../middlewares/password')
//la fonction router
const router = express.Router();

//la route (endpoint) signup
router.post("/signup", password, userController.signup);

//la route (endpoint) login
router.post("/login", userController.login);


//exportation du module
module.exports = router;