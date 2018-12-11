// dependencies
const express = require("express");

// internal imports
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

// GET list of all notes
router.get("/", (req, res) => {
  db("notes")
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err =>
      res.status(500).json({ error: "Error while retrieving notes: ", err })
    );
});

// GET individual note by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("notes")
    .where({ id })
    .first()
    .then(note => {
      if (note) {
        res.status(200).json(note);
      } else {
        res
          .status(404)
          .json({ message: "The note with that id does not exist." });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "Error while retrieving this note: ", err })
    );
});

// PUT edits on existing note by id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if (changes.title && changes.content) {
    // first check to make sure the note exists
    db("notes")
      .where({ id })
      .then(note => {
        if (note && note.length) {
          db("notes")
            .where({ id })
            .update(changes)
            .then(count =>
              db("notes")
                .where({ id })
                .first()
                .then(note => res.status(200).json(note))
            )
            .catch(err =>
              res.status(500).json({
                error: "Error while saving changes to this note: ",
                err
              })
            );
        } else {
          res
            .status(404)
            .json({ message: "The note with that id does not exist." });
        }
      })
      .catch(err =>
        res.status(500).json({
          error: "Error while chekcing database for the note with that id: ",
          err
        })
      );
  } else {
    res.status(422).json({
      message:
        "Fill both title and content fields before submitting changes to this note."
    });
  }
});

// DELETE existing note by id
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("notes")
    .where({ id })
    .del()
    .then(count => {
      if (count) {
        // since it doesn't make sense to have a note's tags stay after it's deleted, also delete all tags with the relevant notes_id
        db("tags")
          .where({ notes_id: id })
          .del()
          .then(
            res.status(200).json({
              message: "Note and associated tags successfully deleted."
            })
          )
          .catch(err =>
            res
              .status(500)
              .json({ error: "Error while deleting associated tags: ", err })
          );
      } else {
        res.status(404).json({ message: "No note with that id exists." });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "Error while deleting this note: ", err })
    );
});
module.exports = router;
