const db = require('../db');

 module.exports = {
    insert,
    getAll,
    getById,
    update,
    remove
}
async function insert(note) {
    const [id] = await db('notes').insert(note);
    return db('notes')
    .where({ id })
    .first();
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
