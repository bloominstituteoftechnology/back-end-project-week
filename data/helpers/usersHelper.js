const db = require('../dbConfig.js');

const bcrypt = require('bcryptjs');

module.exports = {
    getUser,
    getUsers,
    registerUser
};

// return all users in database
function getUsers() {
    return db('users');
};

// return user by id
async function getUser(id) {
    return db('users')
        .where({ id: id });
};

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