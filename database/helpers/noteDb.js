const db = require('../dbConfig');

module.exports = {
    get: function() {
        return db('notes');
    }
}