const DB = require("../dbConfig");

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  editNote,
  deleteNote
};

async function getAllNotes() {
  return DB("notes");
}

async function getNoteById(id) {
  return DB("notes")
    .where("id", id)
    .first();
}

async function createNote(note) {
  return DB("notes")
    .insert(note)
    .then(ids => ({ id: ids[0] }));
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
