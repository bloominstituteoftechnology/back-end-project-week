const db = require("../dbConfig");

module.exports = {
  get,
  insert,
  update,
  remove
};

function get() {
  return db("notes");
}

function insert(note) {
  return db("notes").insert(note);
}

function update(id, note) {
  return db("notes")
    .where({ _id: Number(id) })
    .update(note);
}

function remove(id) {
  return db("notes")
    .where({ _id: Number(id) })
    .del();
}
