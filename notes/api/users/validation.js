const { error } = require('../../config').status;
const { send } = require('../helper');

const message = require('./messages');
const controller = require('./controller');

module.exports = {
  user: (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
      send(res, error.inp, { message: message.noUsernameNoPass });
      return;
    }

    next();
  },
  id: (req, res, next) => {
    const { id } = req.params;
    let query = { _id: id };

    if (!id && req.body.username) {
      query = { username: req.body.username };
    }

    if (!id && !req.body.username) {
      send(res, error.inp, message.noIdNoUsername, message.requestIdError);
      return;
    }

    controller
      .requestBy(query)
      .then(user => {
        if (!user) {
          send(res, error.miss, {
            message: message.requestIdError,
            user: user,
          });

          return;
        }

        req.user = user;
        next();
      })
      .catch(err => send(res, error.server, message.requestIdServerError, err));
  },
  // update: (req, res, next) => {
  //   const { username, password } = req.body;

  //   if (!username && !password) {
  //     send(res, error.inp, { message: message.noUsernameNoPass });
  //     return;
  //   }

  //   next();
  // },
  login: (req, res, next) => {
    const user = req.user;

    user.checkPassword(req.body.password, (isValid, err) => {
      if (err) {
        send(res, error.server, message.checkingError, err);
        return;
      }

      if (isValid) {
        req.userId = user._id;
        next();
        return;
      }

      send(res, error.server, message.passwordMismatch, message.loginError);
    });
  },
  admin: (req, res, next) => {
    if (!req.session.userId) {
      send(res, error.unauth, message.notLoggedIn, message.restricted);
      return;
    }

    next();
  },
};
