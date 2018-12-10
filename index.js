const express = require('express');
const cors = require('cors')
const knex = require('knex')
const knexConfig = require('./knexfile')
const db = knex(knexConfig.development)
const server = express();
server.use(express.json());
server.use(cors());
server.get('/', (req, res) => {
    res.send('Hello')
})
const port = 9000;
server.listen(port, () => console.log(`listening on port ${port}`))
