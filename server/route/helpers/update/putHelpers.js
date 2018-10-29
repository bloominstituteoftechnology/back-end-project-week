const db = require('../../knexConfig.js');

updateNote = (id, note) => {
  return db('note_table')
            .where({ note_id: id })
            .update(note);
};

module.exports = {
  updateNote
};