const db = require('../data/dbConfig.js');

module.exports = {
  getAll,
  insert,
  findById,
  remove,
  update
};

function getAll() {
  return db('notes');
}

async function insert(note) {
  return db('notes')
    .insert(note);
}

function findById(id) {
  return db('notes')
    .where('id', id);
}

async function remove(id) {
  return db('notes')
    .where('id', id)
    .del();
}

async function update(id, changes) {
  return db('notes')
    .where('id', id)
    .update(changes)
    .then(count => (count > 0 ? this.get(id): null));
}