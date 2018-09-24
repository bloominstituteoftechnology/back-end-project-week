const express = require("express");
const knex = require("knex");
const server = express();
const dbConfig = require("./knexfile.js");
const db = knex(dbConfig.development)
server.use(express.json());

server.get("/api/notes", (req, res) => {
    db("notes")
    .select()
    .then(notes => {
        res.status(200).json(notes);
    })
    .catch(err => res.status(404).json({error: "no notes found"}))
})

server.post("/api/notes", (req, res) => {
    const {title, content} = req.body;
    db.insert({title, content})
    .into("notes")
    .then(notes => {
        res.status(201).json(notes);
    })
    .catch(err => res.status(500).json(err));
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n Web API Listening on localhost:${port}\n`);
});