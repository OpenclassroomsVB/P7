const db = require('../models')                 //Different models import
const User = db.user                            //Sequelize user model import

emailVerif = (req, res, next) => {              //Verification of login data
    User.findOne({ where: { pseudo: req.body.pseudo } }).then((user) => {
        if (user) {                             //Pseudo verification
            return res.status(400).send({
                message: 'Pseudo déjà utilisé !',
            })
        }
        User.findOne({ where: { email: req.body.email } }).then((user) => {
            if (user) {                         //email address verification
                return res.status(400).send({
                    message: 'Adresse e-mail déjà utilisée !',
                })
            }
            next()
        })
    })
}

const signupVerif = {
    emailVerif: emailVerif,
}

module.exports = signupVerif                    //SignupVerif export