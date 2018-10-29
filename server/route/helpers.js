const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);


getNotes = () => {
  return db('note_table');
};

getNote = (id) => {
  return db('note_table')
            .where({ note_id: id })
            .first();
};

deleteNote = (id) => {
  return db('note_table')
            .where({ note_id: id > 1 })
            .del();
};

// export 
module.exports = {
  getNotes,
  getNote,
  deleteNote
};