const router = require('express').Router();

const notesEndpoint = require('./api/notes/endpoint');

router.use('/notes', notesEndpoint);

router.route('/').get((req, res) => {
  res.send({ router: 'running' });
});

module.exports = router;
