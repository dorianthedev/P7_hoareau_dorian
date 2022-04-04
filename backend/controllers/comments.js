//importation connexion base de donnée mysql
const mysqlconnection = require('../db/db.mysql');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { log } = require('console');
const result = dotenv.config();

exports.createComments = (req, res, next) => {

        const idPost = req.params.id;
        
        
        const commentsObject = JSON.parse(req.body.comments);
        console.log("commentsObject");
        console.log(commentsObject);
                
        commentsObject.comments_userId = res.locals.userId;
        commentsObject.comments_postId = idPost;


        const comments = {
          ...commentsObject
          };

          mysqlconnection.query(
            'INSERT INTO comments SET ?', comments, (error, results, fields) => {
                if (error) {
                    console.log(error);
                    res.json({error});
                } else {
                    console.log("----> resultats");
                    console.log(results);
                    res.json({message : "Ton post est posté"})
                }
            }
          )


        

    
}