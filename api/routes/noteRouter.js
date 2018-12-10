const express = require("express");
const db = require("../../data/notesDb.js");
const router = express.Router();

router.get("/", (req, res) => {
  db.find()
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => res.status(500).json(err.message));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.find(id)
    .then(note => {
      if (note) {
        res.status(200).json(note);
      } else {
        res
          .status(404)
          .json({ message: "The note with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.post("/", async (req, res) => {
  if (!req.body.title || !req.body.textBody) {
    return res
      .status(400)
      .json({ message: "Please provide title and textBody for the note." });
  }
  try {
    let data = await db.insert(req.body);
    return res.status(201).json({
      id: data.id,
      title: req.body.title,
      textBody: req.body.textBody
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.find(id).then(note => {
    if (!note) {
      res
        .status(404)
        .json({ message: "The note with the specified ID does not exist." });
    } else {
      db.remove(id)
        .then(note => {
          res.status(200).json({ message: "successfully deleted" });
        })
        .catch(err => {
          res.status(500).json(err.message);
        });
    }
  });
});

//updates the note and returns the updated array of notes
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, textBody } = req.body;
  const note = { title, textBody };

  if (!req.body.title || !req.body.textBody) {
    return res
      .status(400)
      .json({ message: "Please provide title and contents for the note." });
  } else {
    db.findById(id).then(note => {
      if (!note) {
        return res
          .status(404)
          .json({ message: "The note with the specified ID does not exist." });
      }
    });
  }

  db.update(id, note)
    .then(res.status(200))
    .catch(err => {
      res.status(500).json(err.message);
    });

  db.get().then(notes => {
    res.status(200).json(notes);
  });
});

module.exports = router;
