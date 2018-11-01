const knex = require('knex');
const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

module.exports = {
    getNotes,
    addNewNote,
    getNote,
    editNote,
    deleteNote
  };
  function getNotes() {
      return db('notes');
  }

  function getNote(id) {
      return db('notes')
        .where({  id })
        .first();
  }

  function addNewNote(note) {
    return db('notes')
      .insert(note)
      .into('notes')
  }
  
  function editNote(id, changes) {
      return db('notes')
        .where({ id })
        .update(changes);
    }

    function deleteNote(id) {
        return db('notes')
            .where({ id })
            .del()
    }
