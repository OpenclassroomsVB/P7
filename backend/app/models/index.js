const dbConfig = require('../config/db-config.js')          //Db-config import
const Sequelize = require('sequelize')                      //Sequelize import

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {    //Creating the sequelize object
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
    timezone: "Europe/Paris"
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.user = require('./user-mdl.js')(sequelize, Sequelize)    //User model import
db.post = require('./post-mdl.js')(sequelize, Sequelize)    //Post model import
db.like = require('./like-mdl.js')(sequelize, Sequelize)    //Like model import

module.exports = db