const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const User = require('../note/noteModel');
const Note =  require('../note/noteModel');
const helmet = require('helmet');

const server = express();

var whitelist = ['http://localhost:3000/', 'https://tender-ptolemy-5e2918.netlify.com/']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
// const corsOptions = {
//     origin: ['https://tender-ptolemy-5e2918.netlify.com/', 'http://localhost:3000/'],
//     credentials: true,
// };

server.use(helmet())
server.use(cors(corsOptions))
server.use(express.json());
server.use(morgan('combined'));

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.get('/api/notes', (req, res) => {
    Note.find()
    .then(notes => {
        res.status(200).json(notes);
    })
    .catch(err => {
        res.status(500).json("error finding notes, server error:", err);
    });
});

server.get('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    Note.findById(id)
    .then(note => {
        res.status(200).json(note);
    })
    .catch(err => {
        res.status(500).json("This note does not exist", err);
    });
});

server.put('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    const options = {
        new: true,
    };
    Note.findByIdAndUpdate(id, changes, options)
        .then(note => {
            if (note) {
                res.status(200).json(note);
            } else {
                res.status(404).json({ message: 'Note not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Server error", error: err });
        });
});

server.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;

    User.findByIdAndRemove(id)
        .then(removedNote => {
            if(removedNote) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: "Note not found" });
            }
        })
        .catch(err => res.status(500).json(err));
});

server.post('/api/notes', (req, res) => {
    Note.create(req.body)
    .then(note => {
        res.status(201).json(note);
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    });
});







module.exports = server;