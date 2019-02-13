const express = require("express");
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get("/api/notes", (req, res) => {
    db("notes").then(notes => {
        res.status(200).json(notes);
    }).catch(error => {
        res.status(500).json({ error: "Error retrieving notes", info: error })
    });
});

app.post("/api/notes", (req, res) => {
    if(req.body && req.body.title && req.body.content && typeof req.body.title === "string" && typeof req.body.content === "string") {
        db("notes").insert(req.body).then(ids => {
            res.status(201).json(ids[0]);
        }).catch(error => {
            res.status(500).json({ error: "Error inserting note", info: error });
        });
    } else {
        res.status(422).json({ error: "Malformed note data" });
    }
});

app.get("/api/notes/:id", (req, res) => {

});

app.put("/api/notes/:id", (req, res) => {

});

app.delete("/api/notes/:id", (req, res) => {

});

app.listen(PORT, () => {
    console.log("Server listening on Port " +PORT);
});