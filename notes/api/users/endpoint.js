const router = require('express').Router();

// const session = require('express-session');
// const mongoose = require('mongoose');
// const MongoStore = require('connect-mongo')(session);

const secret = require('../../config').secret;

const { getToken, validateToken } = require('../../services/auth');

// router.use(
//   session({
//     secret,
//     saveUninitialized: true,
//     resave: true,
//     store: new MongoStore({
//       mongooseConnection: mongoose.connection,
//       autoRemove: 'interval',
//       autoRemoveInterval: 10,
//     }),
//   }),
// );

const { error, success } = require('../../config').status;
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
  controller.request(users => {
    if (users.err) {
      send(res, error.server, message.requestError, users.err);
      return;
    }

    send(res, success.ok, users);
  });
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

// router.route('/login').post(validate.id, validate.login, (req, res) => {
router.route('/login').post(validate.id, validate.login, (req, res) => {
  const userId = req.userId;

  const token = getToken({ username: userId });

  send(res, success.ok, { token });

  // if (req.session.userId === userId.toString()) {
  //   send(res, error.server, message.loginInstanceFound, message.loginError);
  //   return;
  // }

  // req.session.userId = userId;
  // send(res, success.ok, { message: message.loginSuccess });
});

module.exports = router;
