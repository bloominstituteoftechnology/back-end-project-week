const User = require('../models/user');

function setUserInfo(request) {
  const getUserInfo = {
    _id: request._id,
    username: request.username,
    email: request.email,
  };

  return getUserInfo;
}

const viewProfile = (req, res) => {
  const userId = req.params.userId;

  if (req.user._id.toString() !== userId) {
    return res.status(401).json({ error: 'You are not to view this user profile.' });
  }
  User.findById(userId, (err, user) => {
    if (err) {
      res.status(400).json({ error: 'No user could be found for this ID.' });
      return next(err);
    }

    const userToReturn = setUserInfo(user);

    return res.status(200).json({ user: userToReturn });
  });
};

module.exports = { viewProfile };
