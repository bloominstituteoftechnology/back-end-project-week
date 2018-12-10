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

function update(changes) {
  // const updated = await db('notes').where({id: changes.id}).update(changes.title)
  // return updated
}

module.exports = {
  getAll,
  get,
  insert,
  update
};
