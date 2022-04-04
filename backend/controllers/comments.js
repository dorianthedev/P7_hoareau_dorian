//importation connexion base de donnée mysql
const mysqlconnection = require('../db/db.mysql');

const fs = require('fs');

const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
const { log } = require('console');
const result = dotenv.config();

exports.createComments = (req, res, next) => {

      console.log("req.body coments");
      console.log(req.body);

        const id = req.params.id;
        console.log("---> id comments");
        console.log(id);

        const userIdLocals = res.locals.userId;

        // if (userIdLocals == id ) {
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