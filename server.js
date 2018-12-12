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
    console.log(note);
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error getting the note", error });
  }
});

//========POST A NEW NOTE=========
server.post("/api/notes", async (req, res) => {
  const { title, content } = req.body;
  const note = req.body;
  if (!title || !content) {
    res.status(420).json({ message: "Missing information." });
  }
  try {
    const ids = await db("notes").insert(note);
    res.status(201).json(ids);
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error adding the note.", error });
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
server.put("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const update = req.body;

  try {
    await db("notes")
      .where({ id })
      .update(update);
    res.status(200).json(update);
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error updating the note", error });
  }
});

module.exports = server;
