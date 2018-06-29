const mongoose = require('mongoose');
const express = require('express');
// Bring in users model
const users = require('./users/usersModel');
const port = 5000;
const server = express();
// Bring in Notes Model
const notes = require('./notes/notesModel');

server.use(express.json());

const userErrorMessage = (status, message, res) => {
    res.status(status).json({ err: message });
    return;
}

// Connecting Mongo To the database
mongoose.connect("mongodb://localhost/lambdaNotes")
    .then(() => {
        console.log("Connected to Mongo");
    })
    .catch(() => {
        console.log("Error can't connect to Mongo");
    })

server
    .get('/api/users', (req, res) => {
        users
            .find()
            .then(notes => {
                res.json(notes);
            })
    });

server.post("/api/users", (req, res) => {
    const { firstName, lastName } = req.body;
    const charNew = users.create({ firstName, lastName })
        .then(charAdded => {
            res.status(200).json(charAdded);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
})


server
    .get('/api/users/:id', (req, res) => {
        const { id } = req.params;
        users
            .findById(id)
            .then(response => {
                res.json(response);
            })
            .catch(error => {
                res.json({ error: message });
            })
    });

server.get('/api/notes', (req, res) => {
    notes
        .find()
        .then(post => {
            res.json(post);
        })
        .catch(err => {
            console.log(err);
        })
})

server.post('/api/notes', (req, res) => {
    const { title, content } = req.body;
    notes.create({ title, content })
        .then(notes => {
            res.json(notes);
        })
        .catch(err => {
            console.log(err);
    })
})

server
    .get('/api/notes/:id', (req, res) => {
        const { id } = req.params;
        notes
            .findById(id)
            .then(response => {
                res.json(response);
            })
            .catch(error => {
                res.json({ error: message });
            })
    });

server
    .delete('/api/notes/:id', (req, res) => {
        const { id } = req.params;
        notes
            .findById(id)
            .then(response => {
                response.remove()
                res.json(response);
            })
            .catch(error => {
                res.json({ error: message });
            })
    });

server.listen(5000, () => {
    console.log("server running on port 5000");
})