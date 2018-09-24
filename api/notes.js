const express = require("express");
const db = require("../data/helpers/notes");

const router = express.Router();

//get all notes
router.get("/", async (req, res) => {
  try {
    const notes = await db.get();
    res.status(200).json(notes);
  } catch (e) {
    res.status(500).json(e);
  }
});

//get a note by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const note = await db.get(id);
    note
      ? res.status(200).json(note)
      : res.status(404).json({ message: "No note with that id" });
  } catch (e) {
    res.status(500).json(e);
  }
});

//post a new note
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(422).json({ message: "Missing title or content for new note" });
  } else {
    try {
      const id = await db.add(title, content);
      res.status(201).json(id);
    } catch (e) {
      res.status(500).json(e);
    }
  }
});

//put a note update
router.put("/:id", async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  if (!title || !content) {
    res
      .status(422)
      .json({ message: "Title or body is empty, both are required" });
  } else {
    try {
      const updated = await db.update(id, { title, content });
      updated
        ? res.status(200).json({ message: `Note with id ${id} updated` })
        : res.status(404).json({ message: "No note with that id" });
    } catch (e) {
      res.status(500).json(e);
    }
  }
});

//delete a note by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await db.remove(id);
    deleted
      ? res.status(200).json({ message: `Note with id ${id} deleted` })
      : res.status(404).json({ message: "No note with that id" });
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
