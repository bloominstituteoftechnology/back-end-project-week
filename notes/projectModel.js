const knex = require('knex');
const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

module.exports = {
    getNotes,
    addNotes,
    editNotes,
    deleteNotes
  };

  function addNotes(notes) {
    return db('notes')
      .insert(notes)
      .into('notes');
  }
  
