const db = require('../dbConfig');

function getAll() {
  return db('notes');
}

function get(id) {
  return db('notes')
    .where({ id })
    .first();
}

module.exports = {
  getAll,
  get
};
