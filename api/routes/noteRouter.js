const express = require("express");
const db = require("../../data/helpers/notesDb.js");
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
    let newNote = await db.insert(req.body);
    let updatedArray = await db.find();
    return res.status(201).json({
      id: newNote.id,
      title: req.body.title,
      textBody: req.body.textBody,
      notes: updatedArray
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let note = await db.find(id);
    if (!note) {
      res
        .status(404)
        .json({ message: "The note with the specified ID does not exist." });
    }
    await db.remove(id);
    let updatedArray = await db.find();
    return res.status(200).json({
      notes: updatedArray,
      message: "successfully deleted"
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//updates the note and returns the updated array of notes
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, textBody } = req.body;
  const note = { title, textBody };

  if (!req.body.title || !req.body.textBody) {
    return res
      .status(400)
      .json({ message: "Please provide title and contents for the note." });
  } else {
    db.find(id).then(note => {
      if (!note) {
        return res
          .status(404)
          .json({ message: "The note with the specified ID does not exist." });
      }
    });
  }
  try {
    let update = await db.update(id, note);
    let updatedNote = await db.find(id);
    let updatedArray = await db.find();
    return res.status(200).json({ note: updatedNote, notes: updatedArray });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
