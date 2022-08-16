const db = require('../models')                 //Different models import
const User = db.user                            //Sequelize user model import
const jwt = require('jsonwebtoken')             //Jsonwebtoken import
const bcrypt = require('bcryptjs')              //Bcrypt import

exports.signup = (req, res) => {                //Signup middleware export: user creation
    User.create({                               //User creation
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),    //Password hash
    })
        .then(() => {
            res.send({ message: 'Compte créé avec succès' })
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    "Une erreur s'est produite lors la création du compte.",
            })
        })
}

exports.signin = (req, res) => {                 //Login middleware export: find one user
    User.findOne({ where: { email: req.body.email } })
        .then((User) => {
            if (!User) {
                return res
                    .status(404)
                    .send({ message: 'Utilisateur non trouvé' })
            }
            const passwordIsValid = bcrypt.compareSync(   //Password verification
                req.body.password,
                User.password
            ) 
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: 'Mot de passe incorrect!',
                })
            }
            const token = jwt.sign({ id: User.id }, process.env.SECRET_KEY, { //Token creation
                expiresIn: 86400,                                             // 24 hours
            })
            return res.status(200).send({                                     //Allocation of the token
                id: User.id,
                pseudo: User.pseudo,
                email: User.email,
                accessToken: token,
                role: User.role,
            })
        })
        .catch((err) => {
            res.status(500).send({ message: err.message })
        })
}