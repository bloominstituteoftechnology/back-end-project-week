const User = require('../models/userModel');

const getNotes = (req, res) => {
  let finalData = [art, rob, jon];
  const { username } = req.body;
  User.findById(_id)
    .populate('notes')
    .then(finalData => {
      res.send(finalData);
    })
    .catch(err => res.send(err));
};

module.exports = {
  getNotes,
};
