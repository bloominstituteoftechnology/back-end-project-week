const router = require('express').Router();

const { error, success } = require('../../config').status;
const { send } = require('../helper');

const message = require('./messages');
const validate = require('./validation');
const controller = require('./controller');

const userController = require('../users/controller');
const userMessages = require('../users/messages');

const { validateToken } = require('../../services/auth');

router
  .route('/')
  .get(validateToken, (req, res) => {
    controller.request(notes => {
      if (notes.err) {
        send(res, error.server, message.requestError, notes.err);
        return;
      }

      send(res, success.ok, notes);
    });
  })
  .post(validate.note, validateToken, (req, res) => {
    const userId = req.decoded.username;

    controller
      .create(req.body)
      .then(savedNote => {
        const noteId = savedNote._id;

        userController
          .requestBy({ _id: userId })
          .then(user => {
            const notes = user.notes.slice(0);
            notes.push(noteId);

            userController
              .update(user._id, { notes })
              .then(updatedUser => {
                // console.log('upated user', updatedUser);
                // send(res, success.created, updatedUser);
                send(res, success.created, savedNote);
              })
              .catch(err =>
                send(res, server.error, userMessages.updateError, err),
              );
          })
          .catch(err =>
            send(res, error.server, userMessages.requestIdError, err),
          );
      })
      .catch(err => send(res, error.server, message.createdError, err));
  });

router
  .route('/:id')
  .get(validate.id, (req, res) => {
    res.status(success.ok).json(req.note);
  })
  .put(validate.update, validate.id, (req, res) => {
    const { title, content } = req.body;
    // const updatedNote = {
    //   title: title !== undefined ? title : req.note.title,
    //   content: content !== undefined ? content : req.note.content,
    // };

    controller
      .update(req.params.id, { title, content })
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
