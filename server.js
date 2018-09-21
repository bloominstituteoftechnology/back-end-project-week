const MongoClient = require('mongodb').MongoClient;
const express = require('express');
// const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const UsersRoutes = require('./users/UsersRoutes');
// const User = require('../users/User');
const Notes = require('./notes/Notes');
const NotesRoutes = require('./notes/NotesRoutes.js');
// const config = require('./api/config.js');



const server = express();
server.use(helmet());
server.use(express.json());
// server.use(morgan('combined'));
server.use('/api/notes', NotesRoutes);

const port = process.env.PORT || 8000; // added line to load to heroku

mongoose.Promise = global.Promise;

mongoose
    .connect('mongodb://Carlos:loss12@ds121341.mlab.com:21341/marconotesdb')
    .then(() => {
        console.log('connected to notes database');
        
    })
    .catch(err => {
        console.log('error connecting to notes database');
    });

server.listen(process.env.PORT, () => {
    console.log(`Connected to port ${process.env.PORT}`);
});


server.get('/', (req, res) => {
    res.status(200).json({ api: 'running on dat sbux vanilla cream cold brew' });
});



// module.exports = server;