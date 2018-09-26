const db = require("../dbConfig");

module.exports = {
  get: function(id) {
    let query = db("notes");

    if (id) {
      query.where({ id }).first();
    }

    return query;
  }, //get all notes or a note by id
  getByUsername: function(username) {
    let query = db("users").where({ username });

    return Promise.all([query, this.get()]).then(function(results) {
      let [users, notes] = results;
      const user = users[0];
      notes = notes.filter(note => note.user_id === user.id).map(note => ({
        id: note.id,
        title: note.title,
        content: note.content,
        user_id: note.user_id,
        username: user.username
      }));

      return notes;
    });
  },
  add: function(title, content, user_id) {
    let query = db("notes")
      .insert({ title, content, user_id })
      .returning("*");

    return query;
  }, //adding a new note
  update: function(id, note) {
    let query = db("notes")
      .where({ id })
      .update(note)
      .returning("*");

    return query;
  }, //update a note
  remove: function(id) {
    let query = db("notes")
      .where({ id })
      .del();

    return query;
  }
};
