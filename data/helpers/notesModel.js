const db = require('../dbConfig.js');

function insert(note) {
   return db('notes').insert(note);
}

function getNotes() {
   return db('notes');
}

function getById(id) {
   return db('notes')
           .where('id', id);
}

function remove(id) {
   return db('notes')
           .where('id', id)
           .del();
}

function update(id, note) {
   return db('notes')
          .where('id', id)
          .update(note);
}

module.exports = {
  insert, getNotes, getById, remove, update
}