const db = require("../dbConfig");

module.exports = {
  get,
  insert,
  update,
  remove
};

function get(id) {
  const query = db("notes");
  if (id) return query.where({ _id: Number(id) }).first();
  return query;
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
