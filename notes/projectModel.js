const knex = require('knex');
const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

module.exports = {
    getNotes,
    getNotesById,
    addNotes,
    editNotes,
    deleteNotes
  };
  function getNotes() {
      return db('notes');
  }

  function getNotesById(id) {
      return db('notes')
        .where({ id })
        .first();
  }

  function addNotes(note) {
    return db('notes')
      .insert(note)
      .into('notes');
  }
  
  function editNotes(id, changes) {
      return db('notes')
        .where({ id })
        .update(changes);
    }

    function deleteNotes(id) {
        return db('notes')
            .where({ id })
            .del();
    }
