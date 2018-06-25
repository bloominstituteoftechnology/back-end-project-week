const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const server = express();

server.use(cors());
server.use(express.json());

const getNote = require('./backend/getNote/getNote.js');
const createNote = require('./backend/createNote/createNote.js')
const deleteNote = require('./backend/deleteNote/deleteNote.js')


server.use('/api/getNote', getNote);
server.use('/api/createNote', createNote);
server.use('/api/deleteNote', deleteNote);


mongoose.connect('mongodb://localhost/LambdaNotes', {}, (err => {
    err ? console.log(err) : console.log('Mongoose is connected to our Database')
}))

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server up and running on ${port}`)
})