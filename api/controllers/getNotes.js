const User = require('../models/userModel');

const getNotes = (req, res) => {
  const { username } = req.body;
  User.findById(userId)
    .populate('notes')
    .then(finalData => {
      res.send(finalData);
    })
    .catch(err => res.send(err));
};

module.exports = {
  getNotes,
};
