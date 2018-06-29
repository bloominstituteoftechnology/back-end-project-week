const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const UsersRoutes = require('./users/UsersRoutes');
// const User = require('../users/User');
const Notes = require('./notes/Notes');
const NotesRoutes = require('./notes/NotesRoutes.js');
const config = require('./api/config.js');


const port = config.port || 8000;



mongoose
    .connect('mongodb://localhost/notesdb')
    .then(() => {
        console.log('connected to notes database');
        server.listen(config.port, () => {
            console.log(`Connected to port ${config.port}`);
        });
    })
    .catch(err => {
        console.log('error connecting to notes database');
    });





const server = express();
server.use(helmet());
server.use(express.json());
server.use(morgan('combined'));
server.use('/api/notes', NotesRoutes);



server.get('/', (req, res) => {
    res.status(200).json({ api: 'running on dat sbux vanilla cream cold brew' });
});



module.exports = server;