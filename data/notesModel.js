const db = require('../data/dbConfig.js');
 module.exports = {
    insert,
    remove
}
 async function insert(note) {
    const [id] = await db('notes').insert(note);
     return db('notes')
    .where({ id })
    .first();
}
 async function remove(id) {
    return db('notes')
    .where('id', id)
    .del();
} 