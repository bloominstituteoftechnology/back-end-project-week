const express = require('express');
const helmet = require('helmet');

const notesRoute = require('./notes/notesRoute.js');

const server = express();

server.use(helmet());
server.use(express.json());

// sanity check endpoint
server.get('/', (req, res) => {
    res.send("It's allliiiiiive!!");
});

server.use('/api/notes', notesRoute);

const port = 3333;
server.listen(port, () => console.log(`***API running on ${port}***`));