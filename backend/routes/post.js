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

router.get('/:id', authentification, postController.getOnePost); // afficher un post unique grâce à son id post

router.put('/:id',authentification, multer, postController.updatePost) // modifier une sauce grâce à son id

router.delete('/:id',authentification, postController.deletePost) // supprimer une sauce grâce à son id

router.post('/:id/comments',authentification, commentsController.createComments)

// exportation du module
module.exports = router;