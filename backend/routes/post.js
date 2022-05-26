// importation express pour utiliser les outils express
const express = require('express')

// importation du controllers/sauces.js
const postController = require("../controllers/post")

const commentsController = require("../controllers/comments")

// imporation du controller/comments
// const like = require("../controllers/comments")

// la fonction router()
const router = express.Router();

// iportation middleware d'authentification
const authentification = require('../middlewares/authentification');

// //importation multer pour la gestion d'images
const multer =  require('../middlewares/multer');

// les routes
router.post('/',authentification, multer, postController.createPost); // créer une sauce

router.get('/', authentification, postController.getAllPost); // afficher tout les post

router.delete('/:id',authentification, postController.deletePost) // supprimer un post grâce à son id

//pour les commentaires

router.post('/:id/comments',authentification, multer, commentsController.createComments) // creer commentaires

router.delete('/:id/comments',authentification, multer, commentsController.deleteComments) // supprimer commentaires

router.get('/comments',authentification, commentsController.getAllComments) // tout les commentaires


// exportation du module
module.exports = router;