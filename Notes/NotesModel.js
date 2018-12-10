const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById
};

async function insert(note) {
  const [id] = await db('notes').insert(note);

  return db('notes')
    .select('*')
    .where({ id })
    .first();
}

async function update(note) {
  const [id] = await db('notes').update(note);

  return db('notes')
    .select('*')
    .where({ id })
    .first();
}

async function remove(id) {
  const [id] = await db('notes').del(id);

  return db('notes')
    .select('*')
    .where({ id })
    .first();
}

async function getAll(notes) {
  const [id] = await db('notes').get(notes);

  return db('notes')
    .select('*')
    .where({ id })
}
async function findById(id) {
  const [id] = await db('notes').get(id);

  return db('notes')
    .select('*')
    .where({ id })
    .first();
}
