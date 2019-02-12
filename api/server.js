const express = require('express')
const knex = require('knex')
const helmet = require('helmet')
const cors = require('cors')

const server = express(); 

const dbConfig = require('../knexfile')
const db = knex(dbConfig.development)


server.use(express.json(), helmet(), cors())


module.exports = {
    server
}



