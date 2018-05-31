const { getUserToken } = require('./util');

const authenticate = async (req, res, next) => {
  const token = req.get('token');
  if (token) {
    const user = await getUserToken(token);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json('Token invalid');
    }
  }
  res.status(403).json('No token provided. Must be set in Authorization header.');
};

module.exports = { authenticate };