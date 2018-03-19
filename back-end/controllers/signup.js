const User = require('../models/User');

const signup = (req, res) => {
  const user = new User(req.user);

  user.save()
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    })
};

module.exports = {
  signup
}