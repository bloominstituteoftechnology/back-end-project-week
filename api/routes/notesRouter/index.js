const express = require("express");
const DB = require("../../../data/helpers/notes");

const ROUTER = express.Router();

// GET /api/notes/all
ROUTER.get("/all", async (req, res) => {
  const notes = await DB.getAllNotes();
  return notes
    ? res.json(notes)
    : res.status(404).json({ error: "notes not found" });
});
// GET /api/notes/:notesID
ROUTER.get("/:notesID", async (req, res) => {
  const id = req.params.notesID;
  const tagsAndNotes = await DB.getTagsAndNotes(id);
  const note = await DB.getNoteById(id);

  return tagsAndNotes.id ? res.json(tagsAndNotes) : res.json(note);
});
// POST /api/notes/
ROUTER.post("/create", async (req, res) => {
  const { newNote, tags } = req.body;
  // check if title and textBody are present

  if (newNote.title && newNote.textBody) {
    if (!tags) {
      const createdNote = await DB.createNote(newNote);
      const note = await DB.getNoteById(createdNote.id);
      return createdNote
        ? res.json(note)
        : res.status(500).json({ error: "recreate your note and try again." });
    } else {
      const createdNote = await DB.createTagsAndNotes(newNote, tags);
      // handle outcome of createdNote
      return createdNote
        ? res.json(createdNote)
        : res
            .status(500)
            .json({ error: "note and tags not created, try again." });
    }
  } else
    res
      .status(400)
      .json({ error: "note not created, title and body required" });
});
// UPDATE /api/notes/:notesID
ROUTER.put("/:notesID/edit", async (req, res) => {
  const id = req.params.notesID;
  const note = req.body;
  console.log(req.body, "note");
  const newNote = {
    title: note.title,
    textBody: note.textBody
  };
  const count = await DB.editNote(newNote, id);
  const edittedNote = await DB.getNoteById(id);
  if (count) {
    res.status(202).json({ note: edittedNote });
  } else res.status(500).json({ error: "Note not editted, try again later." });
});
// DELETE /api/notes/:notesID
ROUTER.delete("/:notesID", async (req, res) => {
  const id = req.params.notesID;
  const deletedNote = await DB.getNoteById(id);
  const count = await DB.deleteNote(id);

  if (count) {
    res.status(202).json(deletedNote);
  } else res.status(500).json({ error: "Note not deleted, please try again." });
});
module.exports = ROUTER;
