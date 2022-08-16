const db = require('../models')                 //Different models import
const User = db.user                            //Sequelize user model import

exports.findAllUsers = (req, res) => {          //Find all users middleware export
    User.findAll()
        .then((data) => {
            res.send(data)
        })
        .catch((error) => {
            res.status(500).send({ error })
        })
}

exports.findOneUser = (req, res) => {           //Find one user middleware export
    const id = req.params.id
    User.findOneByPk({ where: { id: id } })
        .then((data) => {
            res.send(data)
        })
        .catch((error) => {
            res.status(500).send({ error })
        })
}