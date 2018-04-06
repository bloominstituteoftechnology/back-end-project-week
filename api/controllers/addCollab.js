const User = require('../models/userModel');
const Note = require('../models/noteModel');

const addCollab = (req, res) => {
  const { username, id } = req.body;

  User.findOneAndUpdate({ username }, { $push: { notes: id } })
    .then(() => {
      res.status(201).send({ success: 'collaborator added' });
    })
    .catch(err => res.send(err));
};

module.exports = {
  addCollab,
};
