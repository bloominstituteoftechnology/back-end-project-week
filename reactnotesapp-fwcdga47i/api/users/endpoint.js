const router = require('express').Router();

const secret = JSON.parse(process.env.CONFIG).secret;

const { getToken, validateToken } = require('../../services/auth');

const { error, success } = JSON.parse(process.env.CONFIG).status;
const { send } = require('../helper');

const message = require('./messages');
const validate = require('./validation');
const controller = require('./controller');

router
  .route('/')
  .get((req, res) => {
    send(res, success.ok, { users: 'running' });
  })
  .post(validate.user, (req, res) => {
    controller
      .create(req.body)
      .then(savedUser =>
        send(res, success.created, { ...savedUser._doc, password: undefined }),
      )
      .catch(err => send(res, error.server, message.createdError, err));
  });

router.route('/all').get(validateToken, (req, res) => {
  controller
    .request(users => {
      if (users.err) {
        send(res, error.server, message.requestError, users.err);
        return;
      }

      send(res, success.ok, users);
    })
    .catch(err => send(res, error.server, message.requestError, err));
});

router.route('/notes').get(validateToken, (req, res) => {
  const userId = req.decoded.username;

  controller
    .requestBy({ _id: userId })
    .populate('notes')
    .then(user => send(res, success.ok, user.notes))
    .catch(err => send(res, error.server, message.requestError, err));
});

router.route('/login').post(validate.id, validate.login, (req, res) => {
  const userId = req.userId;

  const token = getToken({ username: userId });

  send(res, success.ok, { token });
});

router.route('/validate').get(validateToken, (req, res) => {
  controller
    .requestBy({ _id: req.decoded.username })
    .then(user => send(res, success.ok, user))
    .catch(err => send(res, error.server, message.requestIdError, err));
});

router
  .route('/:id')
  .get(validate.id, (req, res) => {
    res.status(success.ok).json(req.user);
  })
  .delete(validate.id, (req, res) => {
    controller
      .del(req.params.id)
      .then(deletedUser => send(res, success.ok, deletedUser))
      .catch(err => send(res, error.server, message.deleteError, err));
  });

module.exports = router;
