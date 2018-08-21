const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('./users/User');
const Note = require('./notes/Note');

// const db = require('./config/db');
const setupMiddleware = require('./config/middleware');
const setupRoutes = require('./config/routes');

const server = express();
const secret = "Can you keep a secret?"

// const corsOptions = {
//     origin: 'process.env.CORSORIGIN',
//     credentials: true,
// };

// const corsOptions = {
//     origin: 'http://localhost:3000',
//     credentials: true,
// };

// db
//     .connectTo('lambda-notes-db')
//     .then(() => console.log('\n === API Connected to Database === \n'))
//     .catch(err => console.log('\n *** Error Connecting to Database *** \n', err));

server.use(helmet());
// server.use(cors(corsOptions));
server.use(express.json());
setupMiddleware(server);

// Simple Node Express App to show server is online
// Testing Node Express 

server.get('/', (req, res) => {
    res.send(`<h2>DB: Server up and running...</h2>`);
});

// HTTP METHODS FOR USERS

server.post('/api/register', (req, res) => {
    User.create(req.body)
        .then(user => {
            const token = generateToken(user);
            res.status(201).json({ username: user.username, token });
        })
        .catch(err => res.status(500).json(err));
});

server.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username })
        .then(user => {
            if(user) {
                user
                    .validatePassword(password)
                    .then(passwordsMatch => {
                        if(passwordsMatch) {
                            const token = generateToken(user);
                            res.status(200).json({ message: `Welcome, ${username}!`, token });
                        } else {
                            res.status(401).send('Invalid credentials');
                        }
                    })
                    .catch(err => {
                        res.send('Error comparing passwords.');
                    });
            } else {
                res.status(401).send('Invalid credentials.');
            }
        })
        .catch(err => {
            res.send(err);
        });
});

function generateToken(user) {
    const options = {
        expiresIn: '1h',
    };

    const payload = { name: user.username };

    return jwt.sign(payload, secret, options);
}

function restricted(req, res, next) {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res
                    .status(401)
                    .json({ message: 'Not decoded. You shall not pass.' });
            }

            next();
        });
    } else {
        res
            .status(401)
            .json({ Message: 'No token, no entry.' });
    }
}

server.get('/api/users', restricted, (req, res) => {
    console.log('Users here...');
    User.find({})
        .select('username')
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            return res.status(500).json(err);
        });
});

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
        .then(notes => { 
            res.status(200).json(notes);
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

server.put('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    const titleAndContent = ({ title, content } = req.body);
    Note.findByIdAndUpdate(id, titleAndContent, {new: true})
        .then(response => {
            if (response === null) {
                res.status(404).json({  error: 'Error'});
                return;
            }
            res.json({ success: 'Sucess', resource: response });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    Note.findByIdAndRemove(id)
        .then(response => {
            if (response === null) {
                res.status(404).json({ error: 'Error!' });
                return;
            }
            res.json({ success: 'Success' });
        })
        .catch(err => {
            res.status(500).json({  error: 'Error' })
        });
});

mongoose.Promise = global.Promise;

mongoose
    .connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds018248.mlab.com:18248/lambdanotesdb`)
    .then(() => {
        console.log('\n === Connected to MongoDB === \n');
        // server.listen(port, (req, res) => {
        //     console.log(`\n === API up on port ${port} === \n`)
        // });
    })
    .catch(err => 
    console.log('\n === Error connecting to MongoDB, is it running? === \n', err)
);

const port = process.env.PORT || 5333;

server.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});

