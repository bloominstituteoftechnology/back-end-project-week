const express = require("express");
const cors = require("cors");
const notes = require("../notes/notes.js");
const server = express();

server.use(express.json(), cors());

//request to see if server running
server.get("/", async (req, res) => {
   res.status(200).json({api: "running"});
});

//request to see all notes
server.get("/note/all", async (req, res) => {
   const rows = await notes.getAll();

   res.status(200).json(rows);
});

//get by id
server.get("/note/:id", async (req, res) => {
   const {id} = req.params;
   const response = await notes.findById(id);
   response.length > 0 ? res.status(200).json(response) : res.status(404).json({err: "id does not exist"})
});

//create new note
server.post("/note/create", async (req, res) => {
   const note = req.body
   if(note.title && note.contents){
      const ids = await notes.insert(note);
      res.status(201).json(ids)
   } else {
      res.status(422).json({error: "please provide note title and content"});
   }
});

//edit note by id
server.put("/edit/:id", async (req, res) => {
   const {id} = req.params;
   const note = req.body;
   const response = await notes.update(id, note);
   console.log(response)
   response === 1 ? res.status(201).json(response) : res.status(404).json({err: "id does not exist"})
});

module.exports = server;