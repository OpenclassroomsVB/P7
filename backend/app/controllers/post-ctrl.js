const fs = require('fs')                    //Fs import
const path = require('path')                //Path import
const db = require('../models')             //Different models import
const Post = db.post                        //Sequelize post model import
const User = db.user                        //Sequelize user model import

exports.create = (req, res) => {            //Create post middleware export
    if (!req.body.title || !req.body.description) { //Checking the validity of the post
        return res.status(400).send({
            message:
                'Votre post doit contenir au moins un titre et une description',
        })
    }
    if (!req.file) {                        //Post creation (without image)
        const post = {
            author: req.body.author,
            title: req.body.title,
            description: req.body.description,
        }
        Post.create(post)                   //Save post (without image)
            .then(() => res.send({ message: 'Post ajouté !' }))
            .catch((error) => res.status(400).send({ error: error }))
    } else {
        const post = {                      //Post creation (with image)
            author: req.body.author,
            title: req.body.title,
            description: req.body.description,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${
                req.file.filename
            }`,
        }
        Post.create(post)                   //Save post (with image)
            .then(() => res.send({ message: 'Post ajouté !' }))
            .catch((error) => res.status(400).send({ error: error }))
    }
}

exports.findAll = (req, res) => {           //Find all posts middleware export
    Post.findAll()
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Une erreur s'est produite lors de la recherche des posts.",
            })
        })
}

exports.findOne = (req, res) => {           //Find one post middleware export
    const id = req.params.id   
    Post.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send({
                    message: `Récupération du post: id = ${id}, impossible.`,
                })
            }
        })
        .catch(() => {
            res.status(500).send({
                message:
                    "Une erreur s'est produite lors de la recherche du post: id = " + id,
            })
        })
}

exports.update = (req, res) => {            //Update post middleware export
    const id = req.params.id
    
    User.findOne({ where: { id: req.userId } })
        .then((user) => {
            Post.findOne({ where: { id: id } })
                .then((post) => {
                    if(user.pseudo == post.author || user.role == "admin"  ){
                        if (req.file) {                         //Creation update post (with image)
                            const post = {
                                title: req.body.title,
                                description: req.body.description,
                                imageUrl: `${req.protocol}://${req.get('host')}/images/${
                                    req.file.filename
                                }`,
                            }
                            Post.update(post, { where: { id: id } })   //Update post (with image)
                                .then(() => res.send({ message: 'Post modifié avec succès .' }))
                                .catch((error) => res.status(500).send({ error: error }))
                        } else {
                            const post = {                      //Creation update post (without image)
                                title: req.body.title,
                                description: req.body.description,
                            } 
                            Post.update(post, { where: { id: id } })  //Update post (without image)
                                .then(() => res.send({ message: 'Post modifié avec succès .' }))
                                .catch((error) => res.status(500).send({ error: error }))
                    
                        }
                    }else{
                        res.status(401).json({ message: "Non autorisé" })
                    }
            
                })
                .catch((error) => res.status(400).json({ error: error })) 
            })
        .catch((error) => {
            res.status(500).send({ error })
        })
}

exports.delete = (req, res) => {            //Delete post middleware export
    const id = req.params.id
    User.findOne({ where: { id: req.userId } })
        .then((user) => {
            Post.findOne({ where: { id: id } })
                .then((post) => {
                    if(user.pseudo == post.author || user.role == "admin"  ){
                        if (post.imageUrl) {                 //Delete post (with image)
                            const filename = post.imageUrl.split('/images/')[1]
                            fs.unlink(path.join(__dirname, `../images/${filename}`), (err) => {
                                if (err) throw err;
                            });
                            fs.unlink(path.join(__dirname, `../images/${filename}`), () => { //Deleting the image file
                                Post.destroy({ where: { id: id } })
                                    .then(() => res.json({ message: 'Post supprimé !' }))
                                    .catch((error) =>
                                        res.status(500).json({ error: error }))
                            })
                        } else {                          //Delete post (without image)
                                Post.destroy({ where: { id: id } })
                                    .then(() => res.json({ message: 'Post supprimé !' }))
                                    .catch((error) => res.status(500).json({ error: error }))
                        }
                    }else{
                        res.status(401).json({ message: "Non autorisé" })
                    }
            
                })
                .catch((error) => res.status(400).json({ error: error })) 
            })
        .catch((error) => {
            res.status(500).send({ error })
        })
    
}