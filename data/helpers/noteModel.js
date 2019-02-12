const db = require('../dbConfig');

module.exports = {
  get: (id) => {
    if( id ) {
      // Will return the note with the specified ID
      return db('notes').where('noteId', id).first();
    } else {
      // Will return a list of all notes
      return db('notes');
    }
  },

  insert: (note) => {
    // Create a new note and return the ID
    return db('notes').insert(note);
  },

  update: (id, newNote) => {
    // Edit note and return new note.
    return db('notes').where('noteId', id)
      .update(newNote)
      .then( ([id]) => this.get(id) );
  },

  remove: (id) => {
    // Delete the note
    return db('notes').where('noteId', id)
      .del();
  }

};