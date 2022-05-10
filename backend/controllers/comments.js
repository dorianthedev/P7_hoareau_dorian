//importation connexion base de donnée mysql
const mysqlconnection = require('../db/db.mysql');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { log } = require('console');
const result = dotenv.config();

exports.createComments = (req, res, next) => {

        const idPost = req.params.id;
        
        const commentsObject = req.body;
        commentsObject.comments_userId = res.locals.userId;
        commentsObject.comments_postId = idPost;

        console.log("commentsObject");
        console.log(commentsObject);

          mysqlconnection.query(
            'INSERT INTO comments SET ?', commentsObject, (error, results, fields) => {
                if (error) {
                    console.log(error);
                    res.json({error});
                } else {
                    getOnePost(results.insertId, res)
                }
            }
          )
}

function getOnePost(id, res) {

    try {

        const post = mysqlconnection.query(
            "SELECT * FROM `comments` INNER JOIN `user` ON comments_userId = user.id WHERE `id_comments` = ?", [id],
            (error, results) => {
                if (error) {
                    res.json({error});
                } else {
                    res.status(200).json({results})
                }
            }
        );


    } catch (err) {
        res.status(500).json({ error: err});
    }
}

exports.getAllComments =async (req, res) => {
    const userIdLocals = res.locals.userId;
    const token = res.locals.token;

    try {
        const comments = await mysqlconnection.query(
            "SELECT * FROM `comments` INNER JOIN `user` ON comments_userId = user.id  WHERE ?", ["1"],
            (error, results) => {
                if (error) {
                    res.json({error});
                } else {
                    res.status(200).json({results, userIdLocals, token})
                }
            }
        );
    } catch (err) {
        res.status(500).json({ error: err});
    }
}


exports.deleteComments = (req, res, next) => {

  try {
    const id = req.params.id;
    console.log("--->id");
    console.log(id);

    // SELECT * FROM `post` WHERE `id_post` = 1
    const querySql = " SELECT * FROM comments WHERE id_comments = ?"
    const post = mysqlconnection.query(querySql, [id],
        (error, results) => {
            if (error) {
                res.json({error});
            } else {
                // controle si objet dans la base de donnée

                if (results != 0) {
                    console.log("presence objets dans la bd");
                } else {
                    console.log("objet non present dans la bd");
                    return res.status(404).json({message : "pas d'objet à supprimer dans la bdd"})
                }

                // controle autorisation de la modif par userId

                const userIdLocals = res.locals.userId;

                if (userIdLocals == results[0].comments_userId || res.locals.admin == 1 || res.locals.admin == true) {
                    console.log("authorisation pour delete");

                    // supprime l'image de notre server aussi
                        const querySqlDelete = `
                        DELETE FROM comments
                        WHERE id_comments = ?
                        `;

                        const valuesDelete = [id];
                        
                        mysqlconnection.query(querySqlDelete, valuesDelete, (error, results) => {
                            if (error) {
                                res.status(500).json({error});
                            } else {
                                res.status(201).json({message : "OK SUPPRIMER commentaires dans la base de données", results});
                            }
                        });
                    
                } else {
                    console.log("userId different de l'userId dans db");
                    res.status(403).json({message: " vous n'êtes pas autorisé à SUPPRIMER les données"})
                }
            }
        }
    );
    
  } catch (error) {
      res.status(500).json({error})
  }


  


 
}