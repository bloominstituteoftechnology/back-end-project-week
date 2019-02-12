const DB = require("../dbConfig");

module.exports = {
  getAllNotes,
  createNote,
  editNote,
  deleteNote
};

async function getAllNotes() {
  return DB("notes");
}

async function createNote(note) {
  return DB("notes").insert(note);
}

async function editNote(note) {
  return DB("notes")
    .where("id", note.id)
    .update(note);
}

async function deleteNote(id) {
  return DB("notes")
    .where("id", id)
    .del();
}
