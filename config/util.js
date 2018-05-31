const jwt = require('jsonwebtoken');
const User = require('../modules/users');

const getToken = user => {
  const paylaod = {
    id: user._id,
    session: user.session
  }
  return jwt.sign(paylaod, "t19y95l11a10r");
};

const getUserToken = async (token) => {
  let user;
  try {
    const paylaod = jwt.verify(token, 't19y95l11a10r')
    user = await User.findOne({_id: paylaod.id, session: paylaod.session})
  } catch (err) {
    user = null;
  }
  return user;
};

module.exports = {
  getToken,
  getUserToken
};