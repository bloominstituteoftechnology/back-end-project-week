const knex = require("knex");
const dbconfig = require("../knexfile");
const db = knex(dbconfig.development);

module.exports = {
  getNotes: function(id) {
    if (id) {
      return db("notes")
        .select("notes.title", "notes.text")
        .where({ id: id });
    }
    return db("notes");
  },

  addNote: function(note) {
    if (note !== null && note.title !== "") {
      return db("notes").insert(note);
    }
  },

  editNote: function(id, input) {
    return db("notes")
      .where({ id: id })
      .update(input);
  },

  deleteNote: function(id) {
    return db("notes")
      .where({ id: id })
      .delete();
  }
};
