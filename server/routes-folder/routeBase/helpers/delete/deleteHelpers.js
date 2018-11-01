const db = require('../../../knexConfig.js');

deleteNote = (id) => {
  return db('updated_note_table')
            .where({ note_id: id })
            .del();
};

module.exports = {
  deleteNote
};