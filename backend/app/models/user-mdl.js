module.exports = (sequelize, Sequelize) => {                //User model export
    const User = sequelize.define('users', {
        pseudo: { type: Sequelize.STRING, unique: true, required: true },
        email: { type: Sequelize.STRING, unique: true, required: true },
        password: { type: Sequelize.STRING, required: true },
        role: { type: Sequelize.STRING, defaultValue: 'user' },
    })
    return User
}