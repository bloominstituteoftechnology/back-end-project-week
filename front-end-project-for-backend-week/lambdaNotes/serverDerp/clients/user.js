const User = require('../userModel');
const bcrypt = require('bcrypt');

const createUser = (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
// create user takes in the username and password and saves a user.
// pre save hook should kick in here saving this user to the DB with an encrypted password.
const newUser = User({
    username: username,
    password: password
})

newUser.save()
    .then(response => {
        res.status(200);
        res.send('New User Saved')
    })
    .catch(err => {
        res.status(500);
        res.send('There was an error saving new User');
    });
};

module.exports = { createUser };