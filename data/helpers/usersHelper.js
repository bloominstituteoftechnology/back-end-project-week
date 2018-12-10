const db = require('../dbConfig.js');

module.exports = {
    getUsers
};

// return all notes in database
function getUsers() {
    return db('users');
}