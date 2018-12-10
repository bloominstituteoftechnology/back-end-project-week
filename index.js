require('dotenv').config();
const express = require('express');
const helmet = require("helmet");
const cors = require('cors');
const knex = require("knex");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knexConfig = require("./knexfile");
const db = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.get("/", (req, res) => {
    res.status(200).json({api: "running"});
})

server.get("/api/notes", (req, res) => {
    db("notes")
        .then(notes => res.status(200).json(notes))
        .catch(err => res.status(500).json({error: err}))
})

server.get("/api/notes/:id", (req, res) => {
    let { id } = req.params;
    console.log(id)

    db("notes")
        .where({id})
        .then(note => res.status(200).json(note))
        .catch(err => res.status(500).json({error: err}))
})

server.post("/api/notes", (req, res) => {
    let { title, content } = req.body;

    if (!title) {
        return res.status(405).json({error: "Please enter a title."});
    }
    if (!content) {
        return res.status(405).json({error: "Please enter some content in the note."});
    }

    db("notes")
        .insert({ title, content })
        .then(id => res.status(200).json(id))
        .catch(err => res.status(500).json({error: err}))
})

server.put("/api/notes/:id", (req, res) => {
    let { title, content } = req.body;
    let { id } = req.params;

    if (!title) {
        return res.status(405).json({error: "Please enter a title."});
    }
    if (!content) {
        return res.status(405).json({error: "Please enter some content in the note."});
    }

    db("notes")
        .where({id})
        .update({ title, content })
        .then(count => {
            count ?
            res.status(200).json(count) :
            res.status(400).json({error: "Please enter a valid id"});
        })
        .catch(err => res.status(500).json({error: err}))
})

const port = 9001;

server.listen(port, function() {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
