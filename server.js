const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();

const User = require('./users/User');
const Note = require('./notes/Note');

// const db = require('./config/db');
const setupMiddleware = require('./config/middleware');
const setupRoutes = require('./config/routes');

const server = express();
const secret = "Can you keep a secret?"

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

// db
//     .connectTo('lambda-notes-db')
//     .then(() => console.log('\n === API Connected to Database === \n'))
//     .catch(err => console.log('\n *** Error Connecting to Database *** \n', err));

server.use(helmet());
server.use(cors(corsOptions));
server.use(express.json());
setupMiddleware(server);

// Simple Node Express App to show server is online
// Testing Node Express 

server.get('/', (req, res) => {
    res.send(`<h2>DB:${process.env.mongo}</h2>`);
});

// server.get('/', (req, res) => {
//     res.send(`<h2>Server is online!</h2>`)
// });

server.use('/api/users', userRouter);

// HTTP METHODS FOR NOTES

server.post('/api/createnote', (req, res) => {
    Note.create(req.body)
        .then(note => {
            res.status(201).json({ title: note.title, content: note.content });
        })
        .catch(err => {
            res.status(500).json(err)
        });
});

server.get('/api/notes', (req, res) => {
    Note.find({})
      .select('title')
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  });

server.get('/api/notes/:_id', (req, res) => {
    const { id } = req.params;
    Note.findById(req.params)
        // .select('_id')
        .then(note => res.json(note))
        .catch(err => {
            res.status(500).json(err);
        });
});

// server.use('/api/users', userRouter);
// server.use('/api/notes', userRouter);

// server.get('/', (req, res) => res.send('API Running...'));

const port = process.env.PORT || 5333;

mongoose
    .connect('mongodb://localhost/lambdanotesdb')
    .then(() => {
        console.log('\n === Connected to MongoDB === \n');
        server.listen(port, (req, res) => {
            console.log(`\n === API up on port ${port} === \n`)
        });
    })
    .catch(err => 
    console.log('\n === Error connecting to MongoDB, is it running? === \n', err)
);
// server.listen(port, () => {
//     console.log(`Server is up and running on port ${5333}`);
// });