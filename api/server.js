const express = require('express');
const morgan = require('morgan');
// require('dotenv').config(); when ready to push to heroku
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const UserRoutes = require('./users/UserRoutes');
const User = require('../users/User');
const Notes = require('../notes/Notes');

const port = 5000;//port for Notes react app(frontend).




const server = express();

server.use(helmet());
server.use(morgan('combined'));
server.use(cors());
server.use(express.json());
server.use('/api/notes', NotesRoutes);
// server.use(cors({ origin: 'http://localhost:8000', methods: ['GET', 'POST'], credentials: true }));


server.post('/api/notes', (req, res) => {
    Notes.create(req.body)
        .then(note => {
            res.status(201).json(note);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error saving to database', error: error });     
        })
    
});



server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.listen(port, () => {
    console.log(`server on port ${port}`);
});


module.exports = server;