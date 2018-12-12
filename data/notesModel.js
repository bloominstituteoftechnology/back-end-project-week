const db = require('../data/dbConfig.js')

module.exports = { get, add, update, remove }

async function get(id) {
    return id ? db('notes').where({ id }).first() : db('notes')
}

async function add(note) {
    return await db('notes').insert(note)
    // return db('notes').where({ id }).first()
    // return get(id)
}

async function update(id, changes) {
    const count = await db('notes').where({ id }).update(changes)
    return count > 0 ? db('notes').where({ id }).first() : null
}

async function remove(id) {
    const count = await db('notes').where({ id }).del()
    return count > 0 ? db('notes') : null
}