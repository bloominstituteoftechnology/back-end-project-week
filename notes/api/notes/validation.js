const { error } = require('../../config').status;
const { send, message } = require('../helper');

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
};
