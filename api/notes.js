const express = require("express");
const db = require("../data/helpers/notes");
const jwt = require("../jwtConfig");

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
router.post("/", jwt.protected, async (req, res) => {
  const { title, content } = req.body;
  const userID = req.user.id;
  if (!title || !content) {
    res.status(422).json({ message: "Missing title or content for new note" });
  } else {
    try {
      const newNote = await db.add(title, content, userID);
      res.status(201).json(newNote);
    } catch (e) {
      res.status(500).json(e);
    }
  }
});

//put a note update
router.put("/:id", jwt.protected, async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;

  try {
    const note = await db.get(id);

    if (parseInt(note.user_id, 10) !== parseInt(req.user.id, 10)) {
      res
        .status(401)
        .json({ message: "You're not authorized to update this note" });
    } else {
      if (!title || !content) {
        res
          .status(422)
          .json({ message: "Title or body is empty, both are required" });
      } else {
        const updated = await db.update(id, { title, content });
        updated
          ? res.status(200).json({ message: `Note with id ${id} updated` })
          : res.status(404).json({ message: "No note with that id" });
      }
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

//delete a note by id
router.delete("/:id", jwt.protected, async (req, res) => {
  const { id } = req.params;
  try{
    const note = await db.get(id);

  if (parseInt(note.user_id, 10) !== parseInt(req.user.id, 10)) {
    res
      .status(401)
      .json({ message: "You're not authorized to delete this note" });
  } else {
      const deleted = await db.remove(id);
      deleted
        ? res.status(200).json({ message: `Note with id ${id} deleted` })
        : res.status(404).json({ message: "No note with that id" });
    }
  }catch(e){
    res.status(500).json(e);
  }
});

module.exports = router;
