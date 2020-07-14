const knex = require("knex");

const cl = console.log
const dbConfig = require("../knexfile");
const db = knex(dbConfig.development);

module.exports = {
  getNotes: (activeUser, id) => {
    if (id) {
      return db("notes")
        .where("id", id)
        .first();
    } else return db("notes").where("user_id", activeUser);
  },

  addNote: note => {
    return db("notes").insert(note);
  },

  deleteNote: id => {
    return db("notes")
      .where("id", id)
      .del();
  },

  editNote: (id, note) => {
    return db("notes")
      .where("id", id)
      .update(note);
  },

  login: creds => {
    return db("users")
      .where("username", creds.username)
      .first();
  },

  addUser: creds => {
    return db("users")
      .insert(creds)
  },

  findUserByID: id => {
    return db("users")
      .where("id", id)
      .first();
  }
};
