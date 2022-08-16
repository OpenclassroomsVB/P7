const dotenv = require('dotenv').config()

module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: 'groupomania',
    dialect: 'mysql',
    dialectOptions: { 
        useUTC: false,
      },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
}