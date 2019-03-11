const db = require('../dbConfig.js');

module.exports = {
    invalidateToken,
    tokenExists
};

// adds token to 'black list' to represent logout
function invalidateToken(token) {
    return db('logout')
        .insert(token)
        .then(id => { return { id: id[0] }});
};

// return if token is blacklisted
function tokenExists(token) {
    return db('logout')
        .where({ invalidToken: token })
        .then(row => row.length ? true : false );
};