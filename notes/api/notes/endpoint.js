const router = require('express').Router();

const { error, success } = require('../../config').status;
const { send, message } = require('../helper');

const validate = require('./validation');
const controller = require('./controller');

router
  .route('/')
  .get((req, res) => {
    res.json({ notes: 'running' });
  })
  .post(validate.note, (req, res) => {
    controller
      .create(req.body)
      .then(savedNote => send(res, success.created, savedNote))
      .catch(error => send(res, error.server, message.serverErroror));
  });

module.exports = router;
