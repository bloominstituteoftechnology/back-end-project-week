const express = require("express");
const router = express.Router();
const notes = require("../data/helpers/note_helpers.js");

//request to see all notes
router.get("/all", async (req, res) => {
   const rows = await notes.getAll();
   res.status(200).json(rows);
});

//get by id
router.get("/:id", async (req, res) => {
   const {id} = req.params;
   const response = await notes.findById(id);
   response.length > 0 ? res.status(200).json(response) : res.status(404).json({err: "id does not exist"})
});

//create new note
router.post("/create", async (req, res) => {
   const note = req.body
   if(note.title && note.contents){
      const ids = await notes.insert(note);
      res.status(201).json(ids)
   } else {
      res.status(422).json({error: "please provide note title and content"});
   }
});

//edit note by id
router.put("/edit/:id", async (req, res) => {
   const {id} = req.params;
   const note = req.body;
   const response = await notes.update(id, note);
   response === 1 ? res.status(201).json(response) : res.status(404).json({err: "id does not exist"})
});

//delete note by id
router.delete("/delete/:id", async (req, res) => {
   const {id} = req.params;
   const response = await notes.remove(id)

   response === 1 ? res.status(200).json(response) : res.status(404).json({err: "id does not exist"})
});

module.exports = router;