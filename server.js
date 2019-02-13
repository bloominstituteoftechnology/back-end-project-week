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