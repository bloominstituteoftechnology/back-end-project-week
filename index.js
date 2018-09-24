const express = require('express');
const knex = require("knex");
const server = express();
const dbConfig = require("./knexfile");

const db = knex(dbConfig.development);

server.use(express.json());

//testing the server
server.get('/', (req, res) => {
    res.send("Hello WOrld");
});


//create new note
server.post("/notes", (req,res) => {
    const notes = req.body;

    db("notes")
        .insert(notes)
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(err => res.status(500).json(err));
        // console.log("Error posting new note", err),
});


//get all notes
server.get('/notes', (req, res) => {
    db("notes")
        .then(notes => {
            res.status(200).json(notes);
        })
        .catch(err => res.status(500).json(err));
});

//get note by id
server.get("/notes/:id", (req, res) => {
    const id = req.params.id;

    db("notes")
        .select()
        .where({id})
        .first()
        .then( notes => {
            res.status(201).json(notes);
        })
        .catch(err => res.status(500).json(err));
})

//Editing notes
server.put("/notes/:id", (req, res) => {
    const edits = req.body;
    const id = req.params.id;

    db("notes")
        .where({id})
        .update(edits)
        .then(edit => {
            res.status(200).json(edit);
        })
        .catch(err => res.status(500).json(err));
});

//Deleting notes
server.delete("/notes/:id", (req, res) => {
    const id = req.params.id;
    db("notes")
        .where({id})
        .del(id)
        .then(notes => {
            // console.log("note title", req.body);
            res.status(200).json(`Note ${req.body.title} has been deleted`);
        })
        .catch( err => res.status(500).json(err));
});

server.listen(8000, () => console.log("======API Running on Port 8000======="))