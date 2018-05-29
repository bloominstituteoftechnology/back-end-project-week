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
      res.status(500).json({ message: "Error creating note", err });
    });
};

router.post("/", createNote);

module.exports = router;
