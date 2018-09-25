const db = require('knex')(require('../../knexfile').development);

module.exports = {
  getAllNotes() {
    return db('notes')
      .select('*')
      .join('tags', 'notes.id', 'tags.note_id');
  },
};
