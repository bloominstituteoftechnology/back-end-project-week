const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  // update,
  // remove,
  getAll,
  findByTitle
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

async function findByTitle(id) {
  return db('notes')
    .where({ title: String(id) })
    .select('id', 'title', 'textBody');
}

//  async function remove(id) {
//   const { noteId } = id;

//   try {
//     const deletedNoteCount = await db('notes')
//       .where({ id: noteId })
//       .del();
//     {
//       deletedNoteCount === 0
//         ? res.status(404).json({ message: 'The note with the specified ID does not exist.' })
//         : res.status(200).json({ deletedNoteCount });
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// }
