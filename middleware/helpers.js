const knex = require("knex");

const dbConfig = require("../knexfile");
const db = knex(dbConfig.development);

module.exports = {
  getNotes: id => {
    if (id) {
      return db("notes")
        .where("id", id)
        .first();
    } else return db("notes");
  },

  addNote: note => {
    return db('notes').insert(note)
  }
};
