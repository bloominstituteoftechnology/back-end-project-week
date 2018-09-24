const db = require('./dbConfig');

module.exports = {
    getNotes: function() {
        let query = db('notes');

        if(id) {
            return query    
                .where('id', id)
                .first()
                .then(note => note);
        }

        return query.then(notes => {
            return notes;
        })
    },

    addNote: function(note) {
        return db('notes')
            .insert(note)
            .then(([id]) => this.getNotes(id));
    },

    getNote: function(id) {
        let query = db('notes');

        return query
            .where('id', id)
            .first()
            .then(note => note)
    },

    updateNote: function(id, changes) {
        return db('notes')
            .where('id', id)
            .update(changes)
            .then(count => (count > 0 ? this.getNotes(id) : null));
    },

    deleteNote: function(id) {
        return db('notes')
            .where('id', id)
            .del();
    }
}