const db = require('../../knexConfig.js');

deleteNote = (id) => {
  return db('note_table')
            .where({ note_id: id })
            .del();
};

module.exports = {
  deleteNote
};