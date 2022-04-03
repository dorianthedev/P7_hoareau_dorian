//importation connexion base de donnée mysql
const mysqlconnection = require('../db/db.mysql');

const fs = require('fs');

const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
const { log } = require('console');
const result = dotenv.config();

exports.createComments = (req, res, next) => {


    userIdParamsUrl = req.originalUrl.split("=")[1];
      console.log("----> affichage de l'userId ");
      console.log(userIdParamsUrl);

      const token = req.headers.authorization.split(' ')[1];
      console.log("token auth comments");
      console.log(token);

      const decodedToken = jwt.verify(token, `${process.env.JWT_KEY_TOKEN}`);
      const userId = decodedToken.userId;
        console.log("decoded token comments");
        console.log(decodedToken);

        const id = req.params.id;
        console.log("---> id comments");
        console.log(id);


        // if (userId == userIdParamsUrl ) {
        //   console.log("reussis");

          

        //   mysqlconnection.query(
        //     'INSERT INTO comments SET ?', commentsMess, (error, results, fields) => {
        //         if (error) {
        //             console.log(error);
        //             res.json({error});
        //         } else {
        //             console.log("----> resultats");
        //             console.log(results);
        //             res.json({message : "Ton post est posté"})
        //         }
        //     }
        // )



        // } else {
        //   res.status(404).json({message: "erreur"})
        // }

    
}