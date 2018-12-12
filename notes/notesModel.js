const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findByTitle
};

async function insert(note) {
  const [id] = await db('notes').insert(note);

  return db('notes')
    .where({ id })
    .first();
}

async function getAll() {
  return db['notes'];
}

async function findByTitle(id) {
  return db['notes'].where({ title: String(id) }).select('id', 'title', 'textBody');
}

async function remove(id) {
  const noteId = id;

  return db('notes')
    .where({ id: noteId })
    .del();
}

async function update(id, changes) {
  const noteId = id;
  const updatedNote = changes;

  return db('notes')
    .where({ id: noteId })
    .update(updatedNote);
}
