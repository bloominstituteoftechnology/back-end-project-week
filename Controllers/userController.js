const User = require('../Models/userModel');

const createUser = (req, res) => {
    console.log(req.body);
    const { userName, encryptedPassword } = req.body;
    const newUser = new User({ userName, encryptedPassword });
    newUser.save((err, savedUser) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.json(savedUser);
    });
};

const userLogin = (req, res) => {
    const { username , password } = req.body;
    User.findOne({ username }, (err, user) => {
        if (err) {
            res.status(403).json({ error: 'Invalid Username/Password'});
            return;
        }
        if (user === null) {
            res.status(422).json({ error: 'No user with that username in our DB' });
            return;
        }
        user.checkPassword(password, (nonMatch, hashMatch) => {
            if (nonMatch !== null) {
                res.status(422).json({ error: 'passwords dont match' });
                return;
            }
            if (hashMatch) {
                res.status(200).json(user);
            }
        });
    });
};

module.exports = {
    userLogin,
    createUser
};