// middleware/auth.js

require('dotenv').config();      // importation du paquet dotenv pour les variables d'environnement
const jwt = require('jsonwebtoken');        // importation du paquet jwt

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        const userId = decodedToken.userId
        if (req.body.userId && req.body.userId !== userId) {
            throw "Utilisateur non-reconnu !"
        } else {
            next()
        }
    }
    catch (error) {
        res.status(401).json({ error: error || "Requête non authentifiée !" })
    }
}