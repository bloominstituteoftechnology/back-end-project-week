const User = require('../models/userModel');

const getNotes = (req, res) => {
  console.log('req.session in getNotes: ', req.session)
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
