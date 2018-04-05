const userModel = require('../userModel');
const user = require('../models/userModel');


const createUser = (req, res) => {
    const {Email, Password} = req.body;
    const user = new user({Email, Password});

    user.save()
        .then(user => {
            res.status(201).send(newUser)
        })
        .catch(err => {
            res.status(500)
                .send({err:'Unable to save user info'});
        });
};

module.exports = {
    createUser,
};