const db = require('knex')(require('../../knexfile').development);

module.exports = {
  getAllNotes() {
    return db('notes')
      .select('note_id as id', 'title', 'textBody', 'tag_name as tags')
      .join('tags', 'notes.id', 'tags.note_id');
  },
};
