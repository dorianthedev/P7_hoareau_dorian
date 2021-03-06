// impoortation de bcrypt pour hash le password
const bcrypt = require("bcrypt");
// importation de cryptojs pour chiffrer le mail
const cryptojs = require("crypto-js");
//importation de jsonwebtoken
const jwt = require("jsonwebtoken");

// importation pour utiliser les variables d'environnement
const dotenv = require("dotenv");
const result = dotenv.config();

//importation connexion base de donnée mysql
const mysqlconnection = require("../db/db.mysql");

const fs = require("fs");
const { log } = require("console");

//--------------------EXPORTS.---------------------//

//signup pour enregistrer un noucel user dans la base de donnée
// exports pour exporter dnas la routes/user.js

exports.signup = (req, res) => {
  const { firstName, lastName, email, password, admin } = req.body;
  

  // chiffrer l'email avant de l'envoyer de la base de donnée
  const emailCryptoJs = cryptojs
    .HmacSHA256(email, `${process.env.CRYPTOJS_EMAIL}`)
    .toString();

  // hash du password avant de l'envoyer dans la db
  bcrypt
    .hash(password, 10) // 10 = salt = nombre de fois hash algorithme
    .then((hash) => {
      

      // créer un objet contenue les data clients pour envoyer dans la base de donnée
      const user = {
        firstName: firstName,
        lastName: lastName,
        email: emailCryptoJs,
        password: hash,
        admin: admin,
      };
      

      // requete sql pour envoyer les données dans la table user de la base de donnée
      mysqlconnection.query(
        "INSERT INTO user SET ?",
        user,
        (error, results, fields) => {
          if (error) {
            console.log(error);
            res.json({ error });
          } else {
            console.log("----> resultats");
            console.log(results);
            res.json({ message: "utlisateur créé", user });
          }
        }
      );
    })
    .catch((error) => res.status(500).json({ error }));
};

//login pour chercher et connect un user qui est dans la base de donnée

exports.login = (req, res, next) => {
  //chiffrer l'email de la requete
  const emailCryptoJs = cryptojs
    .HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`)
    .toString();
  const email = emailCryptoJs;

  // requete sql pour envoyer les données dans la table user de la base de donnée
  mysqlconnection.query(
    "SELECT * FROM user WHERE email = ?",
    email,
    (error, results) => {
      if (error) {
        console.log(error);
        res.json({ error });
      } else {
        console.log("----> resultats");
        console.log(results);

        // si l'email n'est pas dans la base de donnée
        if (results == 0) {
          return res
            .status(404)
            .json({ error: "utilisateur inexistant dans la base de donnée" });
        }

        bcrypt
          .compare(req.body.password, results[0].password)
          .then((controlPassword) => {
            // si le password est INcorrect
            if (!controlPassword) {
              return res
                .status(401)
                .json({ error: "Le mot de passe est incorrect" });
            }

            // si le password est correct
            // envoye dans la response du server : userId et le token d'authentification jwt

            // génération du token JWT
            const token = jwt.sign(
              // 3 arguments
              { userId: results[0].id, admin: results[0].admin },
              `${process.env.JWT_KEY_TOKEN}`,
              { expiresIn: "1h" }
            );

            // reponse du server avec le userId et le token
            res.status(201).json({
              userId: results[0].id,
              token,
              admin: results[0].admin,
            });
          })

          .catch((error) => res.status(500).json({ error }));
      }
    }
  );
};

exports.deleteUserEtContent = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, `${process.env.JWT_KEY_TOKEN}`);
  const userId = decodedToken.userId;

  try {
    const id = req.params.id;

    // SELECT * FROM `post` WHERE `id_post` = 1
    const querySql = " SELECT * FROM user WHERE id = ?";
    const post = await mysqlconnection.query(
      querySql,
      [id],
      (error, results) => {
        if (error) {
          res.json({ error });
        } else {
          // controle si objet dans la base de donnée

          if (results != 0) {
            console.log("presence objets dans la bd");
          } else {
            return res
              .status(404)
              .json({ message: "pas d'objet à supprimer dans la bdd" });
          }

          // controle autorisation de la modif par userId

          if (userId == id) {
            // supprime l'image de notre server aussi

            const querySqlDelete = `
                            DELETE FROM user
                            WHERE id = ?
                            `;

            const valuesDelete = [id];
            mysqlconnection.query(
              querySqlDelete,
              valuesDelete,
              (error, results) => {
                if (error) {
                  res.status(500).json({ error });
                } else {
                  res
                    .status(201)
                    .json({
                      message: "OK SUPPRESSION dnas la base de données",
                      results,
                    });
                }
              }
            );
          } else {
            res
              .status(403)
              .json({
                message: " vous n'êtes pas autorisé à modifier les données",
              });
          }
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

//recup all user
exports.getAllUser = async (req, res) => {
  const userIdLocals = res.locals.userId;

  try {
    const id = req.params.id;

    const post = await mysqlconnection.query(
      "SELECT * FROM `user` WHERE ?",
      ["1"],
      (error, results) => {
        if (userIdLocals == id) {
          res.status(200).json({ results });
        } else {
          res.status(403).json({ message: " vous n'êtes pas autorisé " });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

//recup my user

exports.getOneUser = async (req, res, next) => {
  const userIdLocals = res.locals.userId;

  try {
    const id = req.params.id;

    const post = await mysqlconnection.query(
      "SELECT * FROM `user` WHERE `id` = ?",
      [id],
      (error, results) => {
        if (error) {
          res.json({ error });
        } else {
          if (userIdLocals == id) {
            res.status(200).json({ results });
          } else {
            res.status(403).json({ message: " vous n'êtes pas autorisé " });
          }
        }
      }
    );
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
