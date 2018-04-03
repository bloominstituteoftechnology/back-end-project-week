const User = require('../models/userModel');

const getNotes = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .populate('notes')
    .then(finalData => {
      res.send(finalData);
    })
    .catch(err => res.send(err));
};

module.exports = {
  getNotes,
};
