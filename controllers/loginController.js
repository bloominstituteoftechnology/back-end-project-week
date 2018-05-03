const User = require('../models/userModel');

const login = (req, res) => {
    const { userName, password } = req.body;

    User
        .findOne({ userName }, (err, user) => {
            if (err) {
                res.status(400).json({ errMsg: 'Incorrect username/password. Please try again' });
                return;
            } 
            
            if (user === null) {
                res.status(404).json({ errMsg: 'User not found. Please create a user account.' });
                return;
            } 

            user
                .checkPassword(password, (invalidPW, validPW) => {
                    if (invalidPW !== null) {
                        res.status(422).json({ errMsg: 'Invalid Password' });
                    }
                    if (validPW) {
                        res.status(200).json(user);
                    }
                })
            })
}

module.exports = {
    login
};