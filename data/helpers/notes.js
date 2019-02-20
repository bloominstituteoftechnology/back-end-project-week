const DB = require("../dbConfig");

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  editNote,
  deleteNote,
  getTagsAndNotes
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

async function editNote(note, id) {
  return DB("notes")
    .where("id", id)
    .update(note);
}

async function deleteNote(id) {
  return DB("notes")
    .where("id", id)
    .del();
}

async function getTagsAndNotes(id) {
  return DB("notes as n")
    .select(
      "n.id",
      "n.textBody",
      "n.title",
      DB.raw("GROUP_CONCAT(t.tagName) as tags")
    )
    .innerJoin("notesAndTags as nt", "n.id", "nt.note_id")
    .innerJoin("tags as t", "t.id", "nt.tag_id")
    .where("n.id", id)
    .limit(50);
}
