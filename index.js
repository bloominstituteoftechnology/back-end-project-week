const express = require('express');
const helmet = require('helmet');

const knex = require('knex');
const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

const port = 8000;
server.listen(port, () => console.log(`API running on port ${port}`));

// sanity check
server.get('/', (request, response) => {
    response.send('Server initialized.');
});

// POST request
server.post('/api/notes', (request, response) => {
    const title = request.body.title;
    const content = request.body.content;
    const newNote = { title, content };

    db
        .insert(newNote)
        .into('notes')
        .then(ids => {
            return response
                .status(201)
                .json(ids[0]);
        })
        .catch(() => {
            return response
                .status(500)
                .json({ Error: "There was an error while saving the note" })
        });
});