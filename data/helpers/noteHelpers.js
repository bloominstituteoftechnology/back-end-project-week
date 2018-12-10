const db = require('../dbConfig.js')

module.exports = {

    get: id => {
        const query = db('notes')

        if(id) {
            query.where('id', Number(id))
            .first()
        }
        return query
    },
    create: note => {
        return db('notes')
        .insert(note)
        .then(ids => ({id: ids[0]}))
    },
    update: (id, note) => {
        return db('notes')
        .where('id', id)
        .select('*')
        .update(note)
    },
    remove: id => {
        return db('notes')
        .where('id', id)
        .del()
    }
}