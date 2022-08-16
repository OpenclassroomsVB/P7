const db = require('../models')                     //Different models import
const Like = db.like                                //Sequelize Like model import

exports.like = (req, res) => {                      //Like middleware export
    const postId = req.params.id
    const userId = req.userId
    async function like() {
        const likeVerif = await Like.findOne({
            where: [{ postId: postId }, { userId: userId }],
        })
        if (!likeVerif) {                           //If no like exists (for this post and this user)
            const like = {
                postId: postId,
                userId: userId,
            }
            Like.create(like)                       //So, creation of the like
        } else {
            Like.destroy({ where: [{ postId: postId }, { userId: userId }] })   //Otherwise, cancel the like
        }
    }
    like()
}

exports.getAll = (req, res) => {                    //GetAll middleware export
    const postId = req.params.id
    const condition = { postId: postId }
    Like.findAll({ where: condition })              //Retrieving all existing likes for this post
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