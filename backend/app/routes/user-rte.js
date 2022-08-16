const router = require('express').Router()                          //Import router method from express
const { signupVerif, tokenVerif } = require('../middleware')        //SignupVerif & tokenVerif middleware import
const authCtrl = require('../controllers/auth-ctrl')                //Auth-ctrl controller import
const userCtrl = require('../controllers/user-ctrl')                //User-ctrl controller import

router.use(function (req, res, next) {                              //Configuring response object headers
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept'
    )
    next()
})
router.post('/auth/signup', [signupVerif.emailVerif], authCtrl.signup)      //Creating the POST route for signup controller
router.post('/auth/signin', authCtrl.signin)                                //Creating the POST route for signin controller
router.get('/user', [tokenVerif.verifyToken], userCtrl.findAllUsers)        //Creating the GET route for find all users controller
router.get('/user/:id', [tokenVerif.verifyToken], userCtrl.findOneUser)     //Creating the GET route for find one user controller

module.exports = router                                             //Router export