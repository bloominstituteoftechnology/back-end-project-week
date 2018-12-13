const express = require("express");

const db = require("../data/dbConfig");

const router = express.Router();

// endpoints for tags: all have base url "/" = "/api/tags"
// POST new tag
router.post("/", (req, res) => {
  const tag = req.body;
  if (tag.text && tag.notes_id) {
    // first we need to validate that the note id belongs to a valid note
    db("notes")
      .where({ id: tag.notes_id })
      .then(note => {
        if (note && note.length) {
          // if it does, we post the new tag
          db("tags")
            .insert(tag)
            .returning("id")
            .then(id => res.status(201).json(id))
            .catch(err =>
              res.status(500).json({
                error: "Error while adding the new tag: ",
                err
              })
            );
        } else {
          res.status(404).json({ message: "No note with that id exists." });
        }
      });
  } else {
    res.status(422).json({
      message: "New tag must have text and a note ID to be submitted."
    });
  }
});
// GET list of tags (can be filtered for various purposes in react app)
router.get("/", (req, res) => {
  db("tags")
    .then(tags => {
      res.status(200).json(tags);
    })
    .catch(err =>
      res.status(500).json({ error: "Error while retrieving the tags: ", err })
    );
});

// DELETE by tag id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("tags")
    .where({ id })
    .del()
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "No tag exists with that id" });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "Error while deleting this tag: ", err })
    );
});

// DELETE batch of tags by notes_id
router.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  db("tags")
    .where({ notes_id: id })
    .del()
    .then(count => {
      count
        ? res.status(200).json(count)
        : res.status(404).json({
            message: "No tags exist that are associated with that note id"
          });
    })
    .catch(err =>
      res.status(500).json({ error: "Error while deleting these tags: ", err })
    );
});

module.exports = router;
