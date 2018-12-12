const db = require('../dbConfig.js');

const bcrypt = require('bcryptjs');

module.exports = {
    getUser,
    getUserByUsername,
    getUsers,
    registerUser,
    availableUsername
};

// return all users in database
function getUsers() {
    return db('users')
        .select('id', 'username');
};

// return user by id
function getUser(id) {
    return db('users')
        .where({ id: id })
        .select('id', 'username');;
};

function getUserByUsername(username) {
    return db('users')
        .where({ username: username })
        .first();
}

// registers new user if valid, returns new id
function registerUser(user) {
    const newUser = user;
    const hash = bcrypt.hashSync(newUser.password, 14);

    newUser.username = newUser.username.toLowerCase(); // username NOT case sensitive
    newUser.password = hash;

    return db('users')
        .insert(newUser)
        .then(id => { return { id: id[0] }});
};

// true if username is not in database
function availableUsername(name) {
    name = name.toLowerCase();
    return db('users')
        .where({ username: name })
        .then(result => {
            if(result.length){
                return false;
            } else {
                return true;
            }
        });
};