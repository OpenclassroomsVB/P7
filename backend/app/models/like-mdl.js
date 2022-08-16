module.exports = (sequelize, Sequelize) => {                //Like model export
    const Like = sequelize.define('likes', {
        postId: {
            type: Sequelize.INTEGER,
            references: { model: 'posts', key: 'id' },
        },
        userId: {
            type: Sequelize.INTEGER,
            references: { model: 'users', key: 'id' },
        },
    })
    return Like
}