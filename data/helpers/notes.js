const db = require("../dbConfig");

module.exports = {
  get: function(id) {
    let query = db("notes");

    if (id) {
      query.where({ id }).first();
    }

    return query;
  }, //get all notes or a note by id
  add: function(title, content, user_id) {
    let query = db("notes")
      .insert({ title, content, user_id })
      .then(ids => ({ id: ids[0] }));

    return query;
  }, //adding a new note
  update: function(id, note) {
    let query = db("notes")
      .where({ id })
      .update(note);

    return query;
  }, //update a note
  remove: function(id) {
    let query = db("notes")
      .where({ id })
      .del();

    return query;
  }
};
