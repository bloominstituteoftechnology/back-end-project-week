const db = require("../dbConfig.js");

module.exports = {
  find,
  insert,
  update,
  remove
};

function find(id) {
  if (id) {
    return db("notes")
      .where({ id: Number(id) })
      .first();
  } else {
    return db("notes");
  }
}

function insert(note) {
  return db("notes")
    .insert(note)
    .then(ids => ({ id: ids[0] }));
}

function update(id, note) {
  return db("notes")
    .where("id", Number(id))
    .update(note);
}

function remove(id) {
  return db("notes")
    .where("id", Number(id))
    .del();
}
