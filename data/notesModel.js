const db = require('../data/dbConfig.js')

module.exports = { getByAuthor, getByNote, add, update, remove }

async function getByAuthor(uid) {
    return db('notes').where({ uid })
}

async function getByNote(id, uid) {
    return id ? db('notes').where({ uid, id }).first() : db('notes')
}

async function add(note) {
    return await db('notes').insert(note)
}

async function update(id, uid, changes) {
    const count = await db('notes').where({ uid, id }).update(changes)
    return count > 0 ? db('notes').where({ uid, id }).first() : null
}

async function remove(id, uid) {
    const count = await db('notes').where({ uid, id }).del()
    return count > 0 ? db('notes') : null
}