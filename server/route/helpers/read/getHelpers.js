const db = require('../../knexConfig.js');

getNotes = () => {
  return db('note_table');
};

getNote = (id) => {
  return db('note_table')
            .where({ note_id: id })
            .first();
};

// export 
module.exports = {
  getNotes,
  getNote
};