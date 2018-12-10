const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  insert,
  update,
  remove
};

function find() {
  return db("notes");
}

function findById(id) {
  return db("notes").where({ id: Number(id) });
}

function insert(post) {
  return db("notes")
    .insert(post)
    .then(ids => ({ id: ids[0] }));
}

function update(id, post) {
  return db("notes")
    .where("id", Number(id))
    .update(post);
}

function remove(id) {
  return db("notes")
    .where("id", Number(id))
    .del();
}
