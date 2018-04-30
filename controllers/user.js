const User = require('../models/UserModel');
const createUser = (req, res) => {
    const {username, password, firstName, lastName, age } = req.body;

    const user = new User({ username, password, firstName, lastName, age });
    user
        .save((error, user) => {
            if (error) {
                console.log("I was in here line9");
                return res.status(422).json(error);
            }
            console.log("I was in here line12");
            res.json({message: 'User saved'});
        });
};

module.exports = {
    createUser
};