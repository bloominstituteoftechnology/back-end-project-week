const router = require('express').Router();

const User = require('../users/User');

router.post('/register', function(req, res) {
    User.create(req.body)
        .then(({ username }) => {
            res.status(201).json({ username });
        })
        .catch(err => {
            res.status(500).json(err)
        });
});

module.exports = router;