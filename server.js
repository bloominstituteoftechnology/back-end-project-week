const express = require("express");
const middlewareConfig = require("./middleware/middlewareConfig.js");
const knex = require("knex");
const knexConfig = require("./knexfile.js");
const db = knex(knexConfig.development);
// Initializes the server
const server = express();
// Middleware setup
middlewareConfig(server);
// Endpoints
server.get("/", (req, res) => res.send("API UP"));

//=========GET NOTES==========
server.get("/api/notes", async (req, res) => {
  try {
    const notes = await db("notes");
    res.status(200).json(notes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error getting the notes", error });
  }
});

//==========GET NOTE BY ID===========
server.get("/api/notes/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const note = await db("notes").where({ id });
    res.status(200).json(note);
    console.log("this is the server note",note);
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error getting the note", error });
  }
});

//========POST A NEW NOTE=========
server.post("/api/notes", (req, res) => {

  const { title, content } = req.body;
  const note = req.body;
  if (!note) {
    res.status(400).json({ message: "Missing information." });
  } else{
      db('notes')
      .insert(req.body)
      .into('notes')
      .then(id => {
          res.status(201).json({id});
      })
      .catch(err => res.status(500).json({message: 'The notes could not be created'}))
  }
});
  

//==========DELETE A NOTE==========
server.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await db("notes")
      .where({ id })
      .del();
    res.status(200).json(deleted);
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error getting the note.", error });
  }
});

//==========UPDATE NOTE BY ID==========
server.put("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const update = req.body;
  
  if (!update) {
    res.status(400).json({ message: "Missing information." });
  } else{
      db('notes')

      .where({ id })
      .update(update)
      .then(count => {
        res.status(200).json(update);
       
      })
      .catch(err => res.status(500).json({message: 'The notes could not be updated'}))
  }
});

module.exports = server;
