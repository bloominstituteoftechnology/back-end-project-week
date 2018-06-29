require('dotenv').load()
const MongoClient = require('mongodb').MongoClient;
const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const noteRoute = require('./routes/noteRoutes.js')
const userRoute = require('./routes/userRoutes.js')

const server = express()

server.use(helmet())
server.use(express.json())
server.use(morgan('combined'))


const corsOptions = {
    origin: process.env.CORSORIGIN || 'localhost:3000',
    credentials: true
}
server.use(cors(corsOptions))

server.use(session({
    secret: process.env.SECRET,
    cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 },
    secure: false,
    saveUninitialized: false,
    resave: true,
    name: 'none',
    store: new MongoStore({
        url: `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds121341.mlab.com:21341/lambdatakenotesessions`,
        ttl: 60 * 10,
    })
}))

const port = process.env.PORT || 5000


server.get('/', (req, res) => {
    res.json({ api: 'Run away, run away!'})
})

server.use('/auth', userRoute)
server.use('/notes', noteRoute)


mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds217671.mlab.com:17671/lambdanotes`, {}, err => {
    if (err) {
        console.log(`That didn't go as planned`)
    } else {
    console.log(`Hurray for environment variables!`)
    }
})

server.listen(port, () => {
    console.log(`Server up and running on ${port}`)
})