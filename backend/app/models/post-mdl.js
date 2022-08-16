module.exports = (sequelize, Sequelize) => {            //Post model export
    const Post = sequelize.define('posts', {
        author: { type: Sequelize.STRING },
        title: { type: Sequelize.STRING, required: true },
        description: { type: Sequelize.STRING, required: true },
        imageUrl: { type: Sequelize.STRING },
        createdAt: { type: Sequelize.DATE }
    })
    return Post
}