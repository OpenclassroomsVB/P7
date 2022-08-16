const jwt = require('jsonwebtoken')                 //Jsonwebtoken import

verifyToken = (req, res, next) => {                 //Retrieving the token and its authorization level
    let token = req.headers['x-access-token']
    if (!token) {
        return res.status(403).send({
            message: 'Aucun token attribué',
        })
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: 'Non autorisé',
            })
        }
        req.userId = decoded.id
        next()
    })
}

const tokenVerif = { verifyToken: verifyToken }

module.exports = tokenVerif                         //TokenVerif export