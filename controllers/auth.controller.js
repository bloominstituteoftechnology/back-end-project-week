const requireLogIn = require('../config/passport').requireLogIn;
const getTokenForUser = require('../config/token');

const logIn = (req, res) => {
  res.send({
    token: getTokenForUser(req.user),
  });
};

module.exports = { logIn };