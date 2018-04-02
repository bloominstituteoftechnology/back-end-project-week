const User = require('../models/userModels');

const getNotes = (req, res) => {
  const { username } = req.body;
  User.findOne({ username })
    .populate('notes')
    .then(finalData => {
      res.send(finalData);
    })
    .catch(err => res.send(err));
};

module.exports = {
  getNotes,
};
