const User = require('../models/userModel');

const getNotes = (req, res) => {
  console.log('req.session.username in getNotes: ', req.session.username)
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
