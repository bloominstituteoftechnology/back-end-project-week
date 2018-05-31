const jwt = require('jsonwebtoken');
const User = require('../modules/users');

const getToken = user => {
  const payload = {
    id: user._id,
  }
  return jwt.sign(payload, "t19y95l11a10r");
};

const getUserToken = async (token) => {
  let user;
  try {
    const paylaod = jwt.verify(token, 't19y95l11a10r')
    user = await User.findOne({_id: payload.id})
  } catch (err) {
    user = null;
  }
  return user;
};

module.exports = {
  getToken,
  getUserToken
};