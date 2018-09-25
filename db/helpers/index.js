const db = require('knex')(require('../../knexfile').development);

module.exports = {
  getAllNotes() {
    return db('notes')
      .select('notes.id as id', 'title', 'textBody', 'tag_name as tags')
      .leftJoin('tags', 'notes.id', 'tags.note_id');
  },

  addNote(note) {
    return db('notes')
      .insert(note)
      .then(([id]) => id);
  },

  addNoteWithTags(note, tags) {
    let noteID = null;
    return this.addNote(note)
      .then(id => {
        noteID = id;
        return this.this.addTags(tags, id);
      })
      .then(() => noteID);
  },

  getOneNote(id) {
    return this.getAllNotes().where('notes.id', id);
  },

  updateNote(note, id) {
    return db('notes')
      .update(note)
      .where('id', id);
  },

  deleteNote(id) {
    return db('notes')
      .delete()
      .where('id', id);
  },

  addTags(tags, id) {
    return db('tags').insert(
      tags.map(tag => ({
        tag_name: tag,
        note_id: id,
      })),
    );
  },

  updateTags(tags, id) {
    return db('tags')
      .delete()
      .where('note_id', id)
      .then(() => {
        return this.addTags(tags, id);
      });
  },
};
