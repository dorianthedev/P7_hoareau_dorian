//importation connexion base de donnée mysql
const mysqlconnection = require("../db/db.mysql");

const fs = require("fs");

const jwt = require("jsonwebtoken");
const { log } = require("console");

exports.getAllPost = async (req, res) => {
  const userIdLocals = res.locals.userId;
  const token = res.locals.token;

  try {
    const post = await mysqlconnection.query(
      "SELECT *, DATE_FORMAT(post_date, '%e-%c-%y %l:%i')AS date FROM `post` INNER JOIN `user` ON post_userId = user.id  WHERE ? ORDER BY id_post DESC",
      ["1"],
      (error, results) => {
        if (error) {
          res.json({ error });
        } else {
          res.status(200).json({ results, userIdLocals, token });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

function getOnePost(id, res) {
  try {
    const post = mysqlconnection.query(
      "SELECT * FROM `post` INNER JOIN `user` ON post_userId = user.id WHERE `id_post` = ?",
      [id],
      (error, results) => {
        if (error) {
          res.json({ error });
        } else {
          res.status(200).json({ results });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

exports.createPost = async (req, res, next) => {
  const postObject = req.body;

  postObject.post_userId = res.locals.userId;

  function test0() {
    if (req.file) {
      const post = {
        ...postObject,
        post_image: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      };
      return post;
    } else {
      const post2 = {
        ...postObject,
      };
      return post2;
    }
  }

  mysqlconnection.query(
    "INSERT INTO post SET ?",
    test0(),
    (error, results, fields) => {
      if (error) {
        console.log(error);
        res.json({ error });
      } else {
        getOnePost(results.insertId, res);
      }
    }
  );
};

exports.deletePost = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, `${process.env.JWT_KEY_TOKEN}`);
  const userId = decodedToken.userId;

  try {
    const id = req.params.id;

    // SELECT * FROM `post` WHERE `id_post` = 1
    const querySql = " SELECT * FROM `post` WHERE id_post = ?";
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
          const userIdLocals = res.locals.userId;

          if (
            userIdLocals == results[0].post_userId ||
            res.locals.admin == 1 ||
            res.locals.admin == true
          ) {
            if (results[0].post_image !== null) {
              const filename = results[0].post_image.split("/images/")[1];
              fs.unlink(`images/${filename}`, () => {
                const querySqlDelete = `
                                DELETE FROM post
                                WHERE id_post = ?
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
                          message: "OK SUPPRIMER dnas la base de données",
                          results,
                        });
                    }
                  }
                );
              });
            } else {
              const querySqlDelete = `
                            DELETE FROM post
                            WHERE id_post = ?
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
                        message: "OK SUPPRIMER dnas la base de données",
                        results,
                      });
                  }
                }
              );
            }

            // supprime l'image de notre server aussi
          } else {
            res
              .status(403)
              .json({
                message: "vous n'êtes pas autorisé à UPPRIMER les données",
              });
          }
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};
