const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const server = express();

server.use(express.json());
server.use(cors());

const db = require("../data/dbConfig.js");

const rounds = 14; // of hashing passwords

// Sanity Endpoint
server.get("/", (req, res) => {
    res.status(200).json({ api: "Up and running" });
});

// CRUD Endpoints for Lambda Notes
server.post("/api/notes", (req, res) => {
    const newPost = {
        textBody: "",
        tags: [],
        ...req.body
    };
    if (!newPost.title) {
        res.status(400).json({ error: "Note requires a valid title." });
    } else {
        db("notes")
            .insert(newPost)
            .returning("id")
            .then(idReturned => {
                res.status(201).json(idReturned);
            })
            .catch(err => {
                res.status(500).json({ message: "Cannot post note to database.", err });
            });
    }
});

server.get("/api/notes", (req, res) => {
    db("notes")
        .then(notes => res.status(200).json(notes))
        .catch(err => {
            res.status(500).json({ message: "Error retrieving notes", err });
        });
});

server.get("/api/notes/:noteId", (req, res) => {
    const { noteId } = req.params;
    db("notes")
        .where("notes.id", noteId)
        .then(notesArray => {
            if (!notesArray.length) {
                res.status(404).json({ error: "The note with the specified ID was not found." });
            } else {
                const result = notesArray[0];
                res.status(200).json(result);
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error retrieving note.", err });
        });
});

server.put("/api/notes/:noteId", (req, res) => {
    const { noteId } = req.params;
    const newData = req.body;
    db("notes")
        .where("notes.id", noteId)
        .update(newData)
        .then(count => {
            if (!count) {
                res.status(404).json({ message: "Note with that id not found" });
            } else {
                db("notes")
                    .where("notes.id", noteId)
                    .then(notesArray => {
                        res.status(200).json(notesArray[0]);
                    })
                    .catch(err => {
                        res.status(500).json({ message: "Error retrieving modified note", err });
                    });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error modifying note", err });
        });
});

server.delete("/api/notes/:noteId", (req, res) => {
    const { noteId } = req.params;
    db("notes")
        .where("notes.id", noteId)
        .then(notesArray => {
            if (!notesArray.length) {
                res.status(404).json({ message: "Note with specified ID not found" });
            } else {
                db("notes")
                    .where("notes.id", noteId)
                    .del()
                    .then(count => {
                        res.status(200).json(notesArray[0]);
                    })
                    .catch(err => {
                        res.status(500).json({ message: "Error deleting note", err });
                    })

            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error accessing notes", err });
        });
});

// Registration/Login Stuff
function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    };
    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: "8h"
    };

    return jwt.sign(payload, secret, options);
}

server.post("/api/register", (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, rounds);
    creds.password = hash;

    db("users")
        .where({ username: creds.username })
        .first()
        .then(user => {
            if (user) {
                res.status(409).json({ message: "Username in use." });
            } else {
                db("users")
                    .insert(creds)
                    .returning("id")
                    .then(idReturned => {
                        res.status(201).json(idReturned);
                    })
                    .catch(err => {
                        res.status(500).json({ error: err });
                    });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

server.post("/api/login", (req, res) => {
    const creds = req.body;

    db("users")
        .where({ username: creds.username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ message: "Welcome!", token });
            } else {
                res.status(401).json({ message: "Incorrect username or password" });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

module.exports = server;