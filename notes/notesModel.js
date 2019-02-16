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
        if(note.title && note.content) {
            return db('notes').insert(note)
        }
        else {
            return 'Please enter a note with a proper title and content.'
        }
    },

    update: function(id, changes) {
        return db('notes').where('id', id).update(changes)
            .then(notes => {
                return notes[0]
            })
    },

    remove: function(id) {
        return db('notes').where('id', id).del();
    }
}