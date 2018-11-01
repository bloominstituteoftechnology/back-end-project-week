const db = require('../../../knexConfig.js');

getNotes = () => {
  return db('updated_note_table');
};

getNote = (id) => {
  return db('updated_note_table')
            .where({ note_id: id })
            .first();
};

// export 
module.exports = {
  getNotes,
  getNote
};