// importation express pour utiliser les outils express
const express = require('express')
//importation du controllers/user.js
const userController = require('../controllers/user');
const authentification = require('../middlewares/authentification');
//importation du middleware/password
const password = require('../middlewares/password')
//la fonction router
const router = express.Router();

//la route (endpoint) signup
router.post("/signup", password, userController.signup);

//la route (endpoint) login
router.post("/login", userController.login);

//la route delete user et ses post
router.delete("/:id", userController.deleteUserEtContent);

// la route recup all user
router.get("/:id/allusers", authentification, userController.getAllUser);

// la route recup my profile
router.get("/:id/profil", authentification, userController.getOneUser);




//exportation du module
module.exports = router;