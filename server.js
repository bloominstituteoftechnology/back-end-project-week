const express = require('express'); 
const cors = require('cors'); 
const helmet = require('helmet');
const mongoose = require ('mongoose');

const server = express();

const notesModel = require('./Notes/NotesModel.js');
const usersModel = require('./Users/UsersModel.js');

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/notes', notesModel);
server.use('/users', usersModel); 

server.get('/', (req, res) => {
    res.status(200).json({ api: running }); 
}); 

const port = process.env.PORT || 5000; 

mongoose
    .connect('mongodb://localhost/lambdaNotesDb')
    .then(() => {
        console.log('\=== Connected to database server ===\n');
        server.listen(port, (req, res) => {
            console.log(`\n=== Server up and running on ${port} ===\n`); 
        }); 
    })
    .catch(error => {
        console.log('\n=== Error connecting to database server ===\n', error);
    });

