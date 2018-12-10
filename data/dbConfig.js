const knex = require('knex');
const knexConfig = require('../knexfile.js');
db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};

function find() {
  return db('notes');
}

function findById(id) {
  return db('notes').where({ id: Number(id) });
}

function insert(note) {
  return db('notes')
    .insert(note)
    .then(ids => ({ id: ids[0] }));
}

function update(id, note) {
  return db('notes')
    .where('id', Number(id))
    .update(note);note
}

function remove(id) {
  return db('notes')
    .where('id', Number(id))
    .del();
}



