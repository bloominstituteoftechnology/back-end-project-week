const express = require('express');
const knex = require('knex');
const cors = require('cors');
const helmet = require('helmet');

const port = 7000

const dbConfig = require('./knexfile');
const db = knex('dbConfig.development');
const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());


server.get('/', (req, res) => {
    res.status(200).json('SERVER RUNNING');
});

server.get('/api/notes', (req, res) => {
    console.log('hello')
    db('notes')

        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(404).json(err);
        });
});


server.listen(port, () => {
    console.log(`\n Server runnning on port ${port} \n`);
});