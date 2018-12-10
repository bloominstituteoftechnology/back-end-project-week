const db = require('../dbConfig');

function getAll() {
  return db('notes');
}

function get(id) {
  return db('notes')
    .where({ id })
    .first();
}

async function insert(note) {
  const [id] = await db('notes').insert(note, 'id');
  return get(id);
}

module.exports = {
  getAll,
  get,
  insert
};
