const router = require('express').Router();

const notesEndpoint = require('./api/notes/endpoint');
const usersEndpoint = require('./api/users/endpoint');

router.use('/notes', notesEndpoint);
router.use('/users', usersEndpoint);

router.route('/').get((req, res) => {
  res.send({ router: 'running' });
});

module.exports = router;
