const db = require('./dbConfig');

module.exports = {
    insert,
    getAll,
    getById,
    remove,
    update
}

async function insert(note) {
    const [id] = await db('notes').insert(note);

    return db('notes')
    .where({ id })
    .first();
}

async function update(id, note) {
    return await db('notes').where('id', id).update(note);
}

async function getAll() {
    return await db('notes');
}

async function getById(id) {
    return await db('notes').where('id', id).first();
}

async function remove(id) {
    return await db('notes').where('id', id).first().del();
}