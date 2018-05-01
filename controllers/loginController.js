const User = require('../models/userModel');

const login = (req, res) => {
    const { username, password } = req.body;

    User
        .findOne({ username }, (err, user) => {
            if(err) {
                res.status(400).json({ errMsg: 'Incorrect username/password. Please try again' });
            } else if (user === null) {
                res.status(404).json({ errMsg: 'User not found. Please create a user account.' });
            } else {
                User
                    .checkPassword(password, (invalidPW, validPW) => {
                        if (invalidPW !== null) {
                            res.status(422).json({ errMsg: 'Invalid Password' });
                        }
                        if (validPW) {
                            res.status(200).redirect('/:id');
                        }
                    })
                }
            })
}