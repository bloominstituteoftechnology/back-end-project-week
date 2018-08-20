const db = require("../configuration");
const mappers = require("./mappers");

module.exports = {
  get: function(id) {
    let query = db("notes as n");

    if (id) {
      query.where("n.id", id).first();

      const promises = [query, this.getNoteTags(id)]; // [ notes, tags ]

      return Promise.all(promises).then(function(results) {
        let [note, tags] = results;
        note.tags = tags;

        return mappers.noteToBody(note);
      });
    }

    return query.then(notes => {
      return notes.map(note => mappers.noteToBody(note));
    });
  },
  getNoteTags: function(noteId) {
    return db("tags")
      .where("note_id", noteId)
      .then(tags => tags.map(tag => mappers.tagToBody(tag)));
  },
  insert: function(note) {
    return db("notes")
      .insert(note)
      .then(([id]) => this.get(id));
  },
  update: function(id, changes) {
    return db("notes")
      .where("id", id)
      .update(changes)
      .then(count => (count > 0 ? this.get(id) : null));
  },
  remove: function(id) {
    return db("notes")
      .where("id", id)
      .del();
  }
};
