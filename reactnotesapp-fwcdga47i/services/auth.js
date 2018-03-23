const jwt = require('jsonwebtoken');
// const { secret, expiresIn } = require('../config');
const { secret, expiresIn } = JSON.parse(process.env.CONFIG);
// const { secret, expiresIn } =
//   require('../config') || JSON.parse(process.env.CONFIG);

const getToken = userObject => {
  return jwt.sign(userObject, secret, { expiresIn });
};

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res
      .status(422)
      .json({ error: 'No authorization token found on Authorization header' });
    return;
  }
  jwt.verify(token, secret, (authError, decoded) => {
    if (authError) {
      res
        .status(403)
        .json({ error: 'Token invalid, please login', message: authError });
      return;
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = {
  getToken,
  validateToken,
};
