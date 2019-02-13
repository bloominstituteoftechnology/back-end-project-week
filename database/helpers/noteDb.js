const db = require('../dbConfig');

module.exports = {
    get: function() {
        return db('notes');
    },

    add: function(note) {
        return db('notes').insert(note);
    },

    update: function(id, changes) {
        return db('notes')
        .where('id', id)
        .update(changes)
        .then(count => (count > 0 ? this.get(id) : null ));
    },

    remove: function(id) {
        return db('notes').where('id', id).del();
    }
}