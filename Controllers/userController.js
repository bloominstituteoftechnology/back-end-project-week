const UserModel = require('../UserModel');
const User = require('../models/UserModel');
const 

const createUser = (req, res) => {
    const { User, Password } = req.body;
    
    const User = new User({ User, Password });
    
    User.save()
        .then(User => {
            res.status(201)
                .send({
                    message: 'User has been Saved'
                })
        })
        .catch(err => {
            res.status(500)
                .send({
                    err: 'Unable to save User info'
                });
        });
};

module.exports = {
    createUser,
};