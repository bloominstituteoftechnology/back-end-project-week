const express = require('express');
const helmet = require('helmet')
const knex = require('knex');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/notes', (req, res) => {
    db('notes_table') // migrate
    .then(notes => {
        res.status(200).json(notes);
        console.log(notes);
    })
    .catch(err => {
        res.status(500).json({ err: 'Sorry, the list of notes could not be retrieved.', err });
    })
});

const port = process.env.PORT|| 4443;
server.listen(port, () => console.log(`==== Party at port ${port} ====`));