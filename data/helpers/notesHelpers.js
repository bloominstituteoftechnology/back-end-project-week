const db = require('../dbConfig');

function find(id) {
  if(!id) {
    return db('notes').select(id);
  } else return db('notes')

}

function insert(note) {
  return db('notes').insert(note);
}

module.exports = {
  find,
  insert
}

