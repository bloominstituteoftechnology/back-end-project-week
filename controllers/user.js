const User = require('../models/UserModel');
const createUser = (req, res) => {
    const {username, password, firstName, lastName, age } = req.body;

    const user = new User({ username, password, firstName, lastName, age });
    user
        .save((error, user) => {
            if (error) {
                console.log('There was an error saving the user');
                return res.status(422).json(error);
            }
            res.json(user);
        });
};

module.exports = {
    createUser
};