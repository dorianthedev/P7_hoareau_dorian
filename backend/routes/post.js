// importation express pour utiliser les outils express
const express = require('express')

// importation du controllers/sauces.js
const postController = require("../controllers/post")

// imporation du controller/comments
// const like = require("../controllers/comments")

// la fonction router()
const router = express.Router();

// iportation middleware d'authentification
const authentification = require('../middlewares/authentification');

// //importation multer pour la gestion d'images
// const multer =  require('../middleware/multer');

// les routes
// router.post('/', postController.createPost); // créer une sauce

router.get('/', authentification, postController.getAllPost); // afficher tout les objets

// router.get('/:id',authentification, saucesController.getOneSauce); // afficher une sauce unique grâce à son id

// router.put('/:id',authentification, multer, saucesController.updateOneSauce) // modifier une sauce grâce à son id

// router.delete('/:id',authentification, saucesController.deleteOneSauce) // supprimer une sauce grâce à son id

// router.post('/:id/like',authentification, like.likeSauce)

// exportation du module
module.exports = router;