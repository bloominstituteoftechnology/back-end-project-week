const express = require("express");

const db = require("../data/dbConfig");

// init router (Express class)
const router = express.Router();

// endpoints: all have base URL "/" standing for "api/notes/"
// POST new note
router.post("/", (req, res) => {
  const note = req.body;
  if (note.title && note.content) {
    db("notes")
      .insert(note)
      .then(id => {
        res.status(201).json(id);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "Error while attempting to add new note: ", err });
      });
  } else {
    res.status(422).json({
      message:
        "Fill out both a title and content for the new note before submitting."
    });
  }
});

// todo GET list of all notes
// todo GET individual note by id
// todo PUT edits on existing note by id
// todo DELETE existing note by id

module.exports = router;
