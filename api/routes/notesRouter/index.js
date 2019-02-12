const express = require("express");
const DB = require("../../../data/helpers/notes");

const ROUTER = express.Router();

// GET /api/notes/all
ROUTER.get("/", async (req, res) => {
  const notes = await DB.getAllNotes();
  return notes
    ? res.json(notes)
    : res.status(404).json({ error: "notes not found" });
});
// GET /api/notes/:notesID
ROUTER.get("/:notesID", async (req, res) => {
  const { notesID } = req.params;

  const note = await DB.getNoteById(notesID);
  return note
    ? res.json(note)
    : res.status(404).json({ error: "no note found by that id" });
});
// POST /api/notes/
ROUTER.post("/", async (req, res) => {
  const { newNote } = req.body;
  // check if title and textBody are present
  if (newNote.title && newNote.textBody) {
    const createdNote = await DB.createNote(newNote);
    // handle outcome of createdNote
    return createdNote
      ? res.json(createdNote)
      : res.status(500).json({ error: "note not created, try again." });
  } else
    res
      .status(400)
      .json({ error: "note not created, title and body required" });
});
// UPDATE /api/notes/:notesID
ROUTER.put("/:notesID", async (req, res) => {
  const id = req.params.notesID;
  const { note } = req.body;
  const newNote = Object.assign({}, note, { id: id });
  const count = await DB.editNote(newNote);
  const edittedNote = await DB.getNoteById(id);
  if (count) {
    res.status(202).json({ note: edittedNote });
  }
});
// DELETE /api/notes/:notesID
ROUTER.delete("/:notesID", (req, res) => {});
module.exports = ROUTER;
