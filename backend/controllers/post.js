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