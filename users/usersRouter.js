const router = require('express').Router();

const restricted = require('../auth/restricted');
const User = require('./User');

router.get('/', restricted, (req, res) => {
  User.find()
    .select('-password')
    .then(users => {
      res.json( users );
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;