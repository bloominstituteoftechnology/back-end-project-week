const express = require("express");
const notesDB = require("../data/db.js");
const router = express.Router();

function protect(req, res, next) {
  if (!req.body.title || !req.body.textBody) {
    res.status(400).json({ error: "Please insert a title and textbody for the note" });
  } else {
    next();
  }
}

router.get("/", async (req, res) => {
  try {
    const notes = await notesDB.select().from("notes");
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const note = await notesDB
      .select()
      .from("notes")
      .where({ id })
      .first();
    if (note) {
      res.status(200).json(note);
    } else {
      res.status(400).json({ error: "The note with the id could not be found." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", protect, async (req, res) => {
  const addNote = req.body;
  try {
    const ids = await notesDB.insert(addNote).into("notes");
    res.status(201).json(ids[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await notesDB
      .where(req.params)
      .from("notes")
      .del();
    if (count !== 0) {
      res.status(200).json(count);
    } else {
      res.status(400).json({ error: "The project to be deleted couldn't be found." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", protect, async (req, res) => {
  const toAdd = req.body;
  try {
    const count = await notesDB
      .where(req.params)
      .from("notes")
      .update(toAdd);
    if (count !== 0) {
      try {
        const updatedNote = await notesDB
          .select()
          .from("notes")
          .where(req.params);
        res.status(200).json(updatedNote);
      } catch (err) {
        res.status(404).json({ message: "The specific project does not exist." });
      }
    } else {
      res.status(400).json({ err: "That specific project couldn't be found." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;