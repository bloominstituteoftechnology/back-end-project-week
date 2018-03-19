const router = require('express').Router();

const { err, success } = require('../../config').status;
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
      .catch(err => err.name === send(res, err.serv, message.serverError));
  });

module.exports = router;
