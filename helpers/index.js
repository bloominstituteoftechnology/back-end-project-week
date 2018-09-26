const knex = require("knex");
const dbconfig = require("../knexfile");
const db = knex(dbconfig[process.env.DB]);

module.exports = {
  getNotes: function(id) {
    if (id) {
      const promises = [db("notes"), this.getTags(id)];

      return Promise.all(promises).then(function(results) {
        let [notes, tags] = results;
        let note = notes[id - 1];
        note.tags = tags.map(t => t.tag);

        return note;
      });
    }
    const promises = [db("notes"), this.getTagsAll()];

    return Promise.all(promises).then(function(results) {
      let [notes, tags] = results;
      for (let i = 0; i < notes.length; i++) {
        let note = notes[i];
        note.tags = tags.filter(tag => note.id === tag.noteId).map(t => {
            return {
                text: t.tag, 
                id: t.id
            };
          });
      }
      return notes;
    });
  },

  getTags: function(id) {
    return db("notes")
      .select("tags.tag")
      .join("tags", "tags.noteId", "notes.id")
      .where("notes.id", id);
  },
  getTagsAll: function() {
    return db("notes")
      .select("tags.tag", "tags.noteId", "tags.id")
      .join("tags", "tags.noteId", "notes.id");
  },

  addNote: function(note) {
    if (note !== null && note.title !== "") {
      return db("notes").insert(note);
    }
  },

  addTag: function(tag) {
    if (tag !== null && tag !== "") {
      return db("tags").insert(tag);
    }
  },

  editNote: function(id, input) {
    return db("notes")
      .where({ id: id })
      .update(input);
  },

  editTag: function(id, input) {
    return db("tags")
      .where({ id: id })
      .update(input);
  },

  deleteNote: function(id) {
    return db("notes")
      .where({ id: id })
      .delete();
  },

  deleteTag: function(id) {
    return db("tags")
      .where({ id: id })
      .delete();
  }
};
