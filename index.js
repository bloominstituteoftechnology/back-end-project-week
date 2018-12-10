require("dotenv").config();

const express = require("express");
const knex = require("knex");

const knexConfig = require("./knexfile.js");

const db = knex(knexConfig.development);

const server = express();

server.use(express.json())



////////////////////////////////////////////////////ENDPOINTS//////////////////////////////////////////////////////////


// GET ALL NOTES

server.get("/api/notes", (req, res) => {
    db("notes")
      .then(notes => {
        res.status(200).json(notes);
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "The Notes Could Not Be Retrieved " });
      });
  });


  // GET NOTE BY ID

  server.get("/api/notes/:id", (req, res) => {
    const { id } = req.params;
    db("notes")
      .where("id", id)
      .then(note => {
        if (note.length === 0) {
          res
            .status(404)
            .json({ message: "The note with the specified ID does not exist" });
        }
        res.status(200).json(note);
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "The note information could not be retreived" });
      });
  });

  
  // POST A NEW NOTE

  server.post("/api/notes", (req, res) => {
    const notes = req.body;

    db("notes")
      .insert(notes)
      .into("notes")
      .then(ids => {
          res.status(201).json({ids})
      })
      .catch(err => {
          res.status(500).json({ error: err })
      });
  });

// DELETE A NOTE

server.delete("/api/notes/:id", (req, res) => {
    const { id } = req.params;
    db("notes")
      .where("id", id)
      .delete(id)
      .then(notes => {
        if (notes === 0) {
          res.status(404).json({
            message: "The note with the specified ID does not exist"
          });
        }
        res.status(200).json({ message: "Note deleted" });
      })
      .catch(error => {
        res.status(500).json({ error: "The note could not be deleted" });
      });
  });
  

  // EDIT AN EXISTING NOTE 

  server.put("/api/notes/:id", (req, res) => {
    const { id } = req.params;
    const { title, textBody } = req.body;
    if (!title || !textBody) {
      res.status(400).json({
        error: "Please provide Title and TextBody"
      });
    }
    db("notes")
      .where("id", id)
      .update({ title, textBody })
      .then(note => {
        if (!note) {
          res.status(404).json({
            error: "The note with the specified ID does not exist"
          });
        }
        res.status(200).json({ title, textBody });
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "The note information could not be changed" });
      });
  });
  
  



























server.listen(7000, () => console.log("\n== Port 7k ==\n"));