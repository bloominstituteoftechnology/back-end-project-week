const router = require('express').Router();

const { error, success } = require('../../config').status;
const { send } = require('../helper');

const message = require('./messages');
const validate = require('./validation');
const controller = require('./controller');

router
  .route('/')
  .get((req, res) => {
    send(res, success.ok, { users: 'running' });
    // controller.request(notes => {
    //   if (notes.err) {
    //     send(res, error.server, message.requestError, notes.err);
    //     return;
    //   }

    //   send(res, success.ok, notes);
    // });
  })
  .post(validate.user, (req, res) => {
    controller
      .create(req.body)
      .then(savedUser =>
        send(res, success.created, { ...savedUser._doc, password: undefined }),
      )
      .catch(err => send(res, error.server, message.createdError, err));
  });

router
  .route('/:id')
  .get(validate.id, (req, res) => {
    res.status(success.ok).json(req.user);
  })
  // .put(validate.update, validate.id, (req, res) => {
  //   const { username, password } = req.body;
  //   const updatedUser = {
  //     username: username || req.user.username,
  //     password: password || req.user.password,
  //   };

  //   controller
  //     .update(req.params.id, updatedUser)
  //     .then(updatedUser => send(res, success.ok, updatedUser))
  //     .catch(err => send(res, error.server, message.updateError, err));
  // })
  .delete(validate.id, (req, res) => {
    controller
      .del(req.params.id)
      .then(deletedUser => send(res, success.ok, deletedUser))
      .catch(err => send(res, error.server, message.deleteError, err));
  });

module.exports = router;
