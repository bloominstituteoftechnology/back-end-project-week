const db = require('../dbConfig');

module.exports = {
  insert,
  getAll,
  getById,
  update,
  remove
}
async function insert(note) {
   
  return db('notes').insert(note)

  
  
}
function getAll() {
  return db('notes');
}
async function getById(id) {
  return await db('notes').where('id', id).first();
}
async function update(id, note) {
  return await db('notes').where('id', id).update(note);
}
async function remove(id) {
  return await db('notes').where('id', id).first().del();
} 