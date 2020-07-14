//create functions to be used for database changes (getting/rendering notes, adding notes, updating notes, and removing notes)


const db = require('../data/dbConfig.js')

module.exports = { get, add, update, remove }

//get notes
async function get(id) {
    return id ? db('notes').where({ id }).first() : db('notes')
}
//add notes
async function add(note) {
    const [id] = await db('notes').insert(note)
    return db('notes').where({ id }).first()
}
//update notes
async function update(id, changes) {
    const count = await db('notes').where({ id }).update(changes)
    return count > 0 ? db('notes').where({ id }).first() : null
}

//remove notes
async function remove(id) {
    const count = await db('notes').where({ id }).del()
    return count > 0 ? db('notes') : null
} 