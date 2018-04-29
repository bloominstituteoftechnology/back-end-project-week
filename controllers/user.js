const User = require('../models/UserModel');
const createUser = (req, res) => {
    const {username, password} = req.body;

    const user = new User({ username, password });
    user
        .save((error, user) => {
            if (error) {
                return res.status(422).json(error);
            }
            res.json({message: 'User saved'});
        });
};

module.exports = {
    createUser
};