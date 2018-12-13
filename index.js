require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('./data/dbConfig.js');

const server = express();

const port = process.env.PORT || 3500;

server.use(express.json());
server.use(cors());
server.use(helmet());

const generateToken = user => {
    const payload = {
        userId: user.id,
        username: user.username,
    };
    const secret = process.env.SECRET;
    const options = {
        expiresIn: '1d',
    };
    return jwt.sign(payload, secret, options);
};

const protected = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'Invalid token.' });
            } else {
                req.decodedToken = decodedToken;
                next();
            };
        });
    };
};

server.post('/api/users/register', (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 14);
    creds.password = hash;
    db('users')
        .insert(creds)
        .then(ids => {
            const token = generateToken(creds);
            res.status(201).json({ ids, token });
        })
        .catch(err => {
            res.status(500).json({ error: 'There was an error registering the user.', err });
        });
});

server.post('/api/users/login', (req, res) => {
    const creds = req.body;
    db('users')
        .where({ username: creds.username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ message: `Welcome ${user.username}!`, token });
            } else {
                res.status(401).json({ message: 'Wrong username or password' });
            };
        })
        .catch(err => {
            res.status(500).json({ error: 'There was an error loggin in.', err });
        });
});

server.get('/', (req, res) => {
    res.status(200).json({ message: `Server is running on port: ${port}` });
});

server.get('/api/notes', (req, res) => {
    db('notes')
        .then(notes => {
            res.status(200).json(notes);
        })
        .catch(err => {
            res.status(500).json({ error: 'There was an error fetching the notes.', err });
        });
});

server.post('/api/notes', (req, res) => {
    const newNote = req.body;

    if (!newNote.title) {
        res.status(500).json({ message: 'The title field is required.' });
    } else {
        db('notes')
        .insert(newNote)
        .then(ids => {
            res.status(201).json(ids[0]);
        })
        .catch(err => {
            res.status(500).json({ error: 'There was an error adding the new note.', err });
        });
    }
});

server.get('/api/notes/:noteId', (req, res) => {
    const { noteId } = req.params;
    db('notes')
        .where({ id: noteId })
        .first()
        .then(note => {
            if (!note) {
                res.status(404).json({ message: 'A note with that ID was not found.' });
            } else {
                res.status(200).json(note);
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'There was an error fetching the note.', err });
        });
});

server.put('/api/notes/:noteId', (req, res) => {
    const { noteId } = req.params;
    const changes = req.body;
    // if (!changes.title || !changes.content) {
    //     res.status(500).json({ message: 'Please provide a title or content.' });
    // } else {
        db('notes')
        .where({ id: noteId })
        .update(changes)
        .then(count => {
            if (count === 0) {
                res.status(404).json({ message: 'A note with that ID does not exist.' });
            } else {
                res.status(200).json(count);
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'There was an error editing the note.', err });
        });
    // }
});

server.delete('/api/notes/:noteId', (req, res) => {
    const { noteId } = req.params;
    db('notes')
        .where({ id: noteId })
        .del()
        .then(count => {
            if (count === 0) {
                res.status(404).json({ message: 'A note with that ID does not exist.' });
            } else {
                res.status(200).json(count);
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'There was an error deleting the note.', err });
        });
});

server.listen(port, () => console.log(`\n\nServer is running on port: ${port} \n\n`));