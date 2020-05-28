const db = require("../data/dbConfig.js");

module.exports = {
  find,
  findBy,
  findByID,
  add,
  update,
  remove,
};

function find() {
  return db("notes");
}

function findBy(filter) {
  return db("notes").where(filter);
}

function findByID(id) {
  return db("notes").where({ id }).first();
}

function add(flashcard) {
  return db("notes")
    .insert(flashcard, "id")
    .then((ids) => {
      const [id] = ids;
      return findByID(id);
    });
}

function update(id, changes) {
  return db("notes")
    .where({ id })
    .update(changes)
    .then(() => {
      return findByID(id);
    });
}

function remove(id) {
  return db("notes")
    .where("id", id)
    .del()
    .then(() => {
      return id;
    });
}
