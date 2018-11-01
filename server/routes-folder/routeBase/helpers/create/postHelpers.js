const db = require('../../../knexConfig.js');

createNote = (note) => {
  return db('updated_note_table')
            .insert(note)
            .into('updated_note_table');
}

module.exports = {
  createNote
}