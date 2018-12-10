const express = require("express");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());

const db = require("../data/dbConfig.js");

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
            .then(idReturned => {
                res.status(201).json(idReturned);
            })
            .catch(err => {
                res.status(500).json({ message: "Cannot post note to database.", err });
            });
    }
})

module.exports = server;