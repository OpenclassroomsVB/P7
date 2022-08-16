const dotenv = require('dotenv').config()               //Dotenv config import
const express = require('express')                      //Express import
const cors = require('cors')                            //Cors import
const likeRoute = require('./app/routes/like-rte')      //Like route creation
const postRoute = require('./app/routes/post-rte')      //Post route creation
const userRoute = require('./app/routes/user-rte')      //User route creation
const app = express()                                   //Express method for application "app"

const corsOptions = {                                   //Cors origin setup
    origin: 'http://localhost:8081',
}

app.use(cors(corsOptions))                              //To use CORS origin setup
app.use(express.json())                                 //json support
app.use(express.urlencoded({ extended: true }))         //urlencoded support

const db = require('./app/models')                      //Different models import
db.sequelize.sync()                                     //To synchronize the database

app.get('/', (req, res) => {                            //Simple route
    res.json({ message: 'Réseau social interne Groupomania.' })
})
app.use('/images', express.static('./app/images'))      //To serve the static "images" folder
app.use('/api', userRoute)                              //To use userRoute
app.use('/api/posts', postRoute)                        //To use postRoute
app.use('/api/likes', likeRoute)                        //To use likeRoute

const PORT = process.env.PORT || 8080  
app.listen(PORT)                                        //To listen on the defined port
