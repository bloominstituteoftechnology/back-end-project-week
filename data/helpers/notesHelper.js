const db = require('../dbConfig.js');

module.exports = {
    getNotes
};

// return all notes in database
function getNotes() {
    return db('notes');
}