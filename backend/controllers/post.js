//importation connexion base de donnée mysql
const mysqlconnection = require('../db/db.mysql');

const fs = require('fs');

const jwt = require('jsonwebtoken');
const { log } = require('console');


exports.getAllPost =async (req, res) => {
    try {
        const post = await mysqlconnection.query(
            "SELECT * FROM `post` WHERE ?", ["1"],
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

exports.getOnePost = async (req, res, next) => {

    try {
        const id = req.params.id;
        console.log("---> id");
        console.log(id);

        const post = await mysqlconnection.query(
            "SELECT * FROM `post` WHERE `id_post` = ?", [id],
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


exports.createPost = async (req, res, next) => {

    // Besoin d'utiliser un json.parse
    
    const postObject = JSON.parse(req.body.post);
    console.log("possstobject");
    console.log(postObject);
    
    // les variables dans postObject
    const {post_userId, post_title, post_message} = postObject;
    

    const post = {
        ...postObject,
        post_image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        };

        userIdParamsUrl = req.originalUrl.split("=")[1];
        console.log("----> affichage de l'userId auth");
        console.log(userIdParamsUrl);

    
    if (userIdParamsUrl == post_userId ) {
        mysqlconnection.query(
            'INSERT INTO post SET ?', post, (error, results, fields) => {
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
        
    } else {
        res.status(403).json({message: " vous n'êtes pas autorisé"})
    }
   
}



exports.updatePost = async (req, res, next) => {
    console.log("route put : updatePost");

    //aller chercher la table dans post
    try {
        const id = req.params.id;
        console.log("--->id");
        console.log(id);

        // SELECT * FROM `post` WHERE `id_post` = 1
        const querySql = " SELECT * FROM post WHERE id_post = ?"
        const post = await mysqlconnection.query(
            querySql, [id],
            (error, results) => {
                if (error) {
                    res.json({error});
                } else {
                    console.log("selection de l'objet que l'on veut modifier");
                    console.log(results);
                    userIdParamsUrl = req.originalUrl.split("=")[1];
                        console.log(userIdParamsUrl);

                    // controle autorisation de la modif par userId
                    
                    console.log("--> userIdParamsUrl et post_userId route put");
                    console.log(results[0].post_userId);

                    if (userIdParamsUrl == results[0].post_userId) {
                        console.log("authorisation pour modif");
                    

                        // si il y a un fichier attaché
                        if (req.file) {
                            //récupération du nom de la photo à supprimer dans la base de données
                            const filename = results[0].post_image.split('/images/')[1];
                            console.log(filename);
                            //suppression de l'image dans le dossier image du server
                            fs.unlink(`images/${filename}`, () => {
                                if (error) {
                                    throw error;
                                }
                            });
                        }


                        //l'objet qui va être mis à jour dans la base de donnée


                        const postObject = JSON.parse(req.body.post);
                        

                        // créattion des variables qui vont être utilisé pour l'envoie dans MySql
                        // deux cas possible avec et sans le fichier image
                        const ObjectPostImage = req.file ?
                        {
                        ...JSON.parse(req.body.post),
                        post_image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                        } : { ...JSON.parse(req.body.post)};
                        console.log("contenu ObjectPostImage");
                        console.log(ObjectPostImage);

                        //mettre à jour la base de donnée
                        const {post_title, post_message, post_image} = ObjectPostImage;
                        console.log("post_title, post_message, post_image");
                        console.log(post_title, post_message, post_image);
                        
                        const querySqlUpdate = req.file
                        ? `
                        UPDATE post SET
                        post_title = ?,
                        post_message = ?,
                        post_image = ?
                        WHERE id_post =?
                        `
                        :`
                        UPDATE post SET
                        post_title = ?,
                        post_message = ?
                        WHERE id_post =?
                        `;

                        const valuesUpdate = req.file
                        ? [post_title, post_message, post_image, id]
                        : [post_title, post_message, id];
                        
                        console.log("---> values");
                        console.log(valuesUpdate);

                        mysqlconnection.query(querySqlUpdate, valuesUpdate, (error, results) => {
                            if (error) {
                                res.status(500).json({error});
                            } else {
                                res.status(201).json({message : "mise à jour OK dnas la base de données", results});
                            }
                        });
                    } else {
                        console.log("userId different de l'userId dans db");
                        res.status(403).json({message: " vous n'êtes pas autorisé à modifier les données"})
                        
                    }
                }
            }
        );
        
    } catch (error) {
        res.status(500).json({error})
    }

}


exports.deletePost = async (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.JWT_KEY_TOKEN}`);        
    const userId = decodedToken.userId;
    console.log("userid delete");
    console.log(userId);

    try {
        const id = req.params.id;
        console.log("--->id");
        console.log(id);

        // SELECT * FROM `post` WHERE `id_post` = 1
        const querySql = " SELECT * FROM post WHERE id_post = ?"
        const post = await mysqlconnection.query(querySql, [id],
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

                    userIdParamsUrl = req.originalUrl.split("=")[1];
                    console.log(userIdParamsUrl);


                    if (userIdParamsUrl == results[0].post_userId) {
                        console.log("authorisation pour delete");

                        const filename = results[0].post_image.split('/images/')[1];

                        // supprime l'image de notre server aussi

                        fs.unlink(`images/${filename}`, () => {
                            const querySqlDelete = `
                            DELETE FROM post
                            WHERE id_post = ?
                            `;

                            const valuesDelete = [id];
                            mysqlconnection.query(querySqlDelete, valuesDelete, (error, results) => {
                                if (error) {
                                    res.status(500).json({error});
                                } else {
                                    res.status(201).json({message : "mise à jour OK dnas la base de données", results});
                                }
                            });

                        });

                    } else {
                        console.log("userId different de l'userId dans db");
                        res.status(403).json({message: " vous n'êtes pas autorisé à modifier les données"})
                    }
                    

                        
                }
            }
        );
        
    } catch (error) {
        res.status(500).json({error})
    }

}


