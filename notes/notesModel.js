const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  // update,
  // remove,
  getAll
  // findByTitle
};

async function insert(note) {
  // [ 1 ]
  const [id] = await db('notes').insert(note);

  return db('notes')
    .where({ id })
    .first();
}

async function getAll() {
  return db('notes');
}

// async function findByTitle(id) {
//   return db('videogames')
//     .where({ title: String(id) })
//     .select('id', 'title', 'genre', 'releaseYear');
// }
