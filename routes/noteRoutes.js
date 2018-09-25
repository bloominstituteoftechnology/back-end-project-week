"use strict";
const express = require("express");
const helpers = require("../db/dbHelper/helpers.js");
const router = express.Router();

// start GETS
// get all notes
router.get("/", (req, res, next) => {
  helpers
    .getNotes()
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      err.code = 500;
      next(err);
    });
});

// get single note
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  helpers
    .getNote(id)
    .then(note => {
      if (note.length === 0) {
        note.code = 404;
        next(note);
      } else {
        res.status(200).json(note);
      }
    })
    .catch(err => {
      err.code = 500;
      next(err);
    });
});
// end GETS

// start POST
router.post("/", (req, res, next) => {
  const note = req.body;
  if (!note.title || !note.content) {
    note.code = 406;
    next(note);
  } else {
    helpers
      .addNote(note)
      .then(notes => {
        res.status(201).json(notes);
      })
      .catch(err => {
        err.code = 500;
        next(err);
      });
  }
});
// end POST

// start DELETE
router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  const noteToDelete = req.body;
  helpers
    .delNote(id)
    .then(note => {
      if (note === 0) {
        noteToDelete.code = 404;
        next(noteToDelete);
      } else {
        res.status(200).json({ message: "Note removed successfully." });
      }
    })
    .catch(err => {
      err.code = 500;
      next(err);
    });
});
// end DELETE

// start PUT
router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const modifiedNote = req.body;
  if (!modifiedNote.title || !modifiedNote.content) {
    modifiedNote.code = 406;
    next(modifiedNote);
  } else {
    helpers
      .updateNote(id, modifiedNote)
      .then(count => {
        if (count) {
          res.status(200).json({ message: "Note successfully modified." });
        } else {
          modifiedNote.code = 404;
          next(modifiedNote);
        }
      })
      .catch(err => {
        err.code = 500;
        next(err);
      });
  }
});
// end PUT

module.exports = router;
