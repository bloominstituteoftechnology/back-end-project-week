const User = require('../models/user');

const signup = (req, res, next) => {
    const user = new User(req.user);
    const { email } = req.user;

    user
        .save()
        .then(user => {
            req.email = email;
            next();
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

module.exports = {
    signup
};
