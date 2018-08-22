const db = require('../dbConfig');

function find(id) {
  if(!id) {
    return db('notes');
  } else return db('notes').where({id});

}

function insert(note) {
  return db('notes').insert(note);
}

function update(id, note) {
    return db('notes').where({id}).update(note);
}

function remove(id) {
  return db('notes').delete(id);
}


module.exports = {
  find,
  insert,
  update,
  remove
}

