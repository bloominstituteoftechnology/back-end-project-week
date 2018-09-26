const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const mongoose = require('mongoose');

const server = express();

const notesRouter = require('./notes/notesRouter');

//MongoDB Connection
mongoose
    .connect('mongodb://localhost/notedb')
    .then(mongo => {
        console.log('... Connected ...');
    })
    .catch(err => {
        console.log('* Connection Error *', err);
    });


server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/notes', notesRouter);

server.get('/', (req, res) => {
    res.status(200).json('API IS LIT');
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log(`\n=== API RUNNING ===\n`);
});