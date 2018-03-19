const router = require('express').Router();

const { error, success } = require('../../config').status;
const { send, message } = require('../helper');

const validate = require('./validation');
const controller = require('./controller');

router
  .route('/')
  .get((req, res) => {
    controller.request(notes => {
      if (notes.err) {
        send(res, error.server, message.requestError, notes.err);
        return;
      }

      send(res, success.ok, notes);
    });
  })
  .post(validate.note, (req, res) => {
    controller
      .create(req.body)
      .then(savedNote => send(res, success.created, savedNote))
      .catch(error => send(res, error.server, message.createdError));
  });

module.exports = router;
