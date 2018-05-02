const User = require('../users/User.js');

module.exports = oneUser = (req, res) => {
  const { id } = req.params.id;
  User.findById(id).then(user => {
    res.status();
  });
};
