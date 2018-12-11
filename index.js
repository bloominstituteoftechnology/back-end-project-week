const express = require('express');
const cors = require('cors');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

// hard coded configuration object
conf = {
    // look for PORT environment variable,
    // else look for CLI argument,
    // else use hard coded value for port 8080
    port: 3500,
 
    // origin undefined handler
    // see https://github.com/expressjs/cors/issues/71
    originUndefined: function (req, res, next) {
 
        if (!req.headers.origin) {
 
            res.json({
 
                mess: 'Hi you are visiting the service locally. If this was a CORS the origin header should not be undefined'
 
            });
 
        } else {
 
            next();
 
        }
 
    },
 
    // Cross Origin Resource Sharing Options
    cors: {
 
        // origin handler
        origin: function (origin, cb) {
 
            // setup a white list
            let wl = ['http://localhost:3000', 'http://192.168.254.42:3000'];
 
            if (wl.indexOf(origin) != -1) {
 
                cb(null, true);
 
            } else {
 
                cb(new Error('invalid origin: ' + origin), false);
 
            }
 
        },
 
        optionsSuccessStatus: 200
 
    }
 
};

server.use(conf.originUndefined, cors(conf.cors));

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

server.listen(3500, () => console.log('\n\nServer is running on port 3500\n\n'));