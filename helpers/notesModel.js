const db = require('../config/dbConfig')


module.exports = {

 fetchAll: () => {
        return db('notes')
    },
 fetchById: (id) => {
        return db('notes')
            .where('id', id)
            .first()
    },

 addNote: (note) => {
        return db('notes')
            .insert(note)
            .then(([id]) => this.get(id))
    },

 editNote: (id, note) => {
        return db('notes')
            .where('id', id)
            .update(note)
            .then(count => (count > 0 ? this.get(id) : null))
    },
 deleteNote: (id) => {
        return db('notes')
            .where('id', id)
            .del()
    }



}