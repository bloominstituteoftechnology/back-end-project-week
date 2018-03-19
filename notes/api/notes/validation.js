const { error } = require('../../config').status;
const { send, message } = require('../helper');

const controller = require('./controller');

module.exports = {
  note: (req, res, next) => {
    const { title, content } = req.body;

    if (!title || !content) {
      return send(res, error.inp, message.noTitleNoTex);
      next();
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
};
