const db = require('../dbConfig');

module.exports = {
    get: function() {
        return db('notes');
    },

    add: function(note) {
        return db('notes').insert(note);
    }
}