"use strict";
const express = require("express");
const helpers = require("../db/dbHelper/helpers.js");
const router = express.Router();

// test route
// router.get("/", (req, res, next) => {
//   res.status(200).json({ message: "Working API" });
// });

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
      res.status(200).json(note);
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
    err.code = 406;
    next(err);
  } else {
    helpers
      .addNote(note)
      .then(notes => {
        res.status(201).json({ message: "Note successfully added." });
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
  helpers
    .delNote(id)
    .then(notes => {
      if (notes === 0) {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
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

module.exports = router;
