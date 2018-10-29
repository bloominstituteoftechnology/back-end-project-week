const db = require('../../knexConfig.js');

createNote = (note) => {
  return db('note_table')
            .insert(note)
            .into('note_table');
}

module.exports = {
  createNote
}