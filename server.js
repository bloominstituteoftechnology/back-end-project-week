require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')

const server = express()

server.use(helmet())
server.use(express.json())
server.use(morgan('combined'))

const port = process.env.PORT || 5000

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://' + process.env.DB_USER + process.env.DB_PASS + '@ds217671.mlab.com:17671/lambdanotes', {}, err => {
    if (err) {
        console.log(`That didn't go as planned`)
    } else {
    console.log(`Hurray for environment variables!`)
    }
})

server.get('/', (req, res) => {
    res.send({ api: `Up and running`})
})

server.listen(port, () => {
    console.log(`Server up and running on ${port}`)
})