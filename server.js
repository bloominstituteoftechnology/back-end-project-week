const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');



mongoose.Promise = global.Promise;
mongoose
    .connect('mongodb://localhost/notesdb')
    .then(mongo => {
        useMongoClient: true
        console.log('connected to notes database',mongo)
    })
    .catch(err => {
        console.log('Error connecting to notes database', err);
    });

const NoteModel = require('./note/NoteModel');

const server = express();

server.use(helmet());
server.unsubscribe(cors());
server.use(express.json());

server.get('/', function(req,res) {
    res.status(200).json({api: 'running'});
});

server.use('/api/notes', NoteModel);

const port = process.env.PORT || 7000;

server.listen(port, () => {
    console.log(`\n=== API running on http://localhost:${port} ===\n`);
});

module.exports = {
    server
};