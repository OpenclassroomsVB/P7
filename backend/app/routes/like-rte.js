const router = require('express').Router()                      //Import router method from express
const { tokenVerif } = require('../middleware')                 //TokenVerif middleware import
const likeCtrl = require('../controllers/like-ctrl')            //LikeCtrl controller import

router.post('/:id', [tokenVerif.verifyToken], likeCtrl.like)    //Creating the POST route for the like controllers
router.get('/:id', [tokenVerif.verifyToken], likeCtrl.getAll)   //Creating the GET route for the like controllers

module.exports = router                                         //Router export