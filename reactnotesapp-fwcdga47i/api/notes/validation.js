const { error } = JSON.parse(process.env.CONFIG).status;
// const { error } = require('../../config').status;
// const { error } =
//   require('../../config').status || JSON.parse(process.env.CONFIG).status;

const { send } = require('../helper');

const message = require('./messages');
const controller = require('./controller');

module.exports = {
  note: (req, res, next) => {
    const { title, content } = req.body;

    if (!title || !content) {
      send(res, error.inp, message.noTitleNoText);
      return;
    }

    next();
  },
  id: (req, res, next) => {
    const { id } = req.params;

    controller
      .requestBy(req.params.id)
      .then(note => {
        if (!note) {
          send(res, error.miss, {
            message: message.requestIdError,
            note: note,
          });

          return;
        }

        req.note = note;
        next();
      })
      .catch(err => send(res, error.server, message.requestIdServerError, err));
  },
  update: (req, res, next) => {
    const { title, content } = req.body;

    if (!title && !content) {
      send(res, error.inp, { message: message.noTitleNoText });
      return;
    }

    next();
  },
};
