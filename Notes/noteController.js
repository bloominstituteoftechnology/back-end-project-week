const express = require("express");
const router = express.Router();

const Note = require("./noteModel");
const User = require("../Users/userModel");

router.get("/", (req, res) => {
  let query = Note.find();

  query
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Note.findById(id)
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/create", (req, res) => {
  const noteInput = req.body;
  const note = new Note(noteInput);

  note
    .save()
    .then(newNote => {
      res.status(201).json(newNote);
    })
    .catch(err => {
      if (note.title === undefined || note.content === undefined) {
        res
          .status(400)
          .json({ errorMsg: "Please provide both title and content of note." });
      } else {
        res.status(500).json({
          err
        });
      }
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Note.findByIdAndRemove(id)
    .then(response => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: "Cannot find note" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const noteEdited = req.body;

  Note.findByIdAndUpdate(id, noteEdited)
    .then(response => {
      if (response === null) {
        res.status(404).json({ message: "Note not found" });
      } else {
        res.status(200).json(response);
      }
    })
    .catch(err => {
      if (err.name === "CastError") {
        res.status(400).json({
          errorMsg: "invalid ID, check and try again."
        });
      } else {
        res.status(500).json(err);
      }
    });
});

module.exports = router;
