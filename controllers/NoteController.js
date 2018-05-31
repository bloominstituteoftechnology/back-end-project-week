const express = require("express"); // remember to install your npm packages

const Note = require("../models/Note");
const router = express.Router();

const createNote = (req, res) => {
  console.log("creating note");
  const note = new Note(req.body);

  note
    .save()
    .then(newNote => {
      res.status(201).json(newNote);
    })
    .catch(err => {
      res.json({ message: "Error creating note", err });
    });
};

const getAllNotes = (req, res) => {
  console.log("getting all notes");
  Note.find()
    .then(p => {
      res.status(200).json(p);
    })
    .catch(err => {
      res.status(500).json({ msg: "we cant display notes " });
    });
};

const getNote = (req, res) => {
  console.log("fetching note");
  const { id } = req.params;
  Note.findById(id)
    .then(p => {
      res.status(200).json(p);
    })
    .catch(err => {
      res.status(500).json({ msg: "we cant display the note " });
    });
};

const updateNote = (req, res) => {
  console.log("updating note");
  const { id, title, content } = new Note(req.body);
  Note.findByIdAndUpdate(id, { title, content })
    .then(updatedNote => res.json({ "note updated": updatedNote }))
    .catch(err => res.status(500).json(err));
};

const deleteNote = (req, res) => {
  console.log("deleting note");
  const id = req.body.id;
  Note.findByIdAndRemove(id)
    .then(deletedNote => res.json({ "note deleted": deletedNote }))
    .catch(err => res.status(500).json(err));
};

router.get("/", getAllNotes);
router.post("/", createNote);
router.get("/:id", getNote);
router.put("/", updateNote);
router.delete("/", deleteNote);

module.exports = router;
