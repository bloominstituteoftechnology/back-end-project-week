const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
const Joi = require('joi');

function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).json(err);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({
      error: 'No token provided must be provided on authorization header',
    });
  }
}
function validateNewUserCred(req, res, next) {
  const newUser = req.body;
  const schema = {
    username: Joi.string().min(3),
    password: Joi.string().min(3),
  };
  const { error, value } = Joi.validate(newUser, schema);

  if (error === null) {
    next();
  } else {
    res.status(400).json({ message: 'You shall not pass.' });
  }
}
module.exports = {
  jwt,
  secret,
  authenticate,
  validateNewUserCred,
};
