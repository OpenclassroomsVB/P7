const router = require('express').Router()                  //Import router method from express
const { tokenVerif } = require('../middleware')             //TokenVerif middleware import
const multer = require('../middleware/multer-config')       //Multer-config import
const post = require('../controllers/post-ctrl.js')         //Post controller import

router.post('/', [tokenVerif.verifyToken], multer, post.create)     //Creating the POST route for create post controller
router.get('/', [tokenVerif.verifyToken], post.findAll)             //Creating the GET route for find all posts controller
router.get('/:id', [tokenVerif.verifyToken], post.findOne)          //Creating the GET route for find one post controller
router.put('/:id', [tokenVerif.verifyToken], multer, post.update)   //Creating the PUT route for update post controller
router.delete('/:id', [tokenVerif.verifyToken], post.delete)        //Creating the DELETE route for delete post controller

module.exports = router                                     //Router export