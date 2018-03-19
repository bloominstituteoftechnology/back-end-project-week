const router = require('express').Router();

const { error, success } = require('../../config').status;
const { send } = require('../helper');

const message = require('./messages');
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
      .catch(err => send(res, error.server, message.createdError, err));
  });

router
  .route('/:id')
  .get(validate.id, (req, res) => {
    res.status(success.ok).json(req.note);
  })
  .put(validate.update, validate.id, (req, res) => {
    const { title, content } = req.body;
    const updatedNote = {
      title: title || req.note.title,
      content: content || req.note.content,
    };

    controller
      .update(req.params.id, updatedNote)
      .then(updatedNote => send(res, success.ok, updatedNote))
      .catch(err => send(res, error.server, message.updateError, err));
  })
  .delete(validate.id, (req, res) => {
    controller
      .del(req.params.id)
      .then(deletedNote => send(res, success.ok, deletedNote))
      .catch(err => send(res, error.server, message.deleteError, err));
  });

module.exports = router;
