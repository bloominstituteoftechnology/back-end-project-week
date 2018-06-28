const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
// require('dotenv').config(); when ready to push to heroku
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const UsersRoutes = require('../users/UsersRoutes');
const User = require('../users/User');
const Notes = require('../notes/Notes');
const NotesRoutes = require('../notes/NotesRoutes');
const config = require('../api/config.js');

// const port = 5000;//port for Notes react app(frontend).




const server = express();

server.use(helmet());
server.use(express.json());
server.use(morgan('combined'));
server.use(cors());

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


//testing server and connection from NotesRoutes
// server.delete('/api/notes/:id', (req, res) => {
//     const id = req.params.id;
//     const details = { '_id': new ObjectID(id) };
//     db.collection('Notes').remove(details, (err, item) => {
//         if (err) {
//             res.send({ 'error': 'Error has occurred' });
//         } else {
//             res.send('Notes' + id + 'deleted!!!');
//         }
//     });
// });

server.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(422).json({ message: 'NEED an ID' });
    } else {
        Notes.findByIdAndRemove(id)
            .then(note => {
                if (note) {
                    res.status(204).end();
                } else {
                    res.status(404).json({ message: 'Note not found' });
                }
            })
            .catch(err => res.status(500).json(err));
    }
});


module.exports = server;