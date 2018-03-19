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

    controller
      .requestBy(req.params.id)
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
};
