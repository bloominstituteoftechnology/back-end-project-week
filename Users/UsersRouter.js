const router = require('express').Router(); 

const User = require('./UsersModel.js');

router
    .get('/', (req, res) => {
        User.find()
            .select('-password')
            .then(users => {
                res.json(users);
            })
            .catch(error => {
                res.status(500).json(error); 
            });
    });

    module.exports = router; 