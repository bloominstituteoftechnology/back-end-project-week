const { error } = require('../../config').status;
const { send, message } = require('../helper');

module.exports = {
  note: (req, res, next) => {
    const { title, text } = req.body;

    if (!title || !text) {
      return send(res, error.inp, message.noTitleNoTex);
      next();
      return;
    }

    next();
  },
};
