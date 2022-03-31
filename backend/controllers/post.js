//importation connexion base de donnée mysql
const mysqlconnection = require('../db/db.mysql');


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
            "SELECT * FROM `post` WHERE `post_userId` = ?", [id],
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