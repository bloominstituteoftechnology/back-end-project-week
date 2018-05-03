const express = require("express");
const router = express.Router();

const Note = require("../api/models/noteModel");

router.get("/", (req, res) => {
  Note.find({})
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(error => {
      res.status(500).json({ error: "Could not access Notes" });
    });
});

router.post("/", (req, res) => {
  const { title, content } = req.body;
  const newNote = new Note({ title, content });
  newNote
    .save()
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => {
      res.status(500).json({ err: "Could not create Note" });
    });
});

router.put("/:_id", (req, res) => {
  Note.findByIdAndUpdate(req.params._id, req.body)
    .update(id, update)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete("/:_id", (req, res) => {
  Note.findbyIdandRemove(req.params.id)
    .then(note => {
      res.status(200).json(`${id} has been deleted`);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

module.exports = router;
