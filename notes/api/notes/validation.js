const { send, message } = require('../helper');

module.exports = {
  note: (req, res, next) => {
    const { title, text } = req.body;

    if (!title || !text) {
      return send(res, err.inp, message.noTitleNoTex);
      next();
      return;
    }

    next();
  },
};
