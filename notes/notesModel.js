const db = require('../data/dbConfig.js');

module.exports = {
    get: function(id) {
        if(id) {
            return db('notes').where('id',id)
                .then(notes => {
                    return notes[0]
                })
        }
        else {
            return db('notes')
        }
    },

    insert: function(note) {
        return db('notes').insert(note)
            // .then( ([id]) => get(id))
    }

    update: function(id, changes) {
        return db('notes').where('id', id).update(changes)
            // .then(notes)
    }
}