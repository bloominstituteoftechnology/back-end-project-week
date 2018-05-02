const Note = require('../Models/Note');
const User = require('../Models/User');

const noteGet = (req, res) => {
  const author = req.body.username;
  const id = req.body.id;
  console.log(req.body);
  User.findById({ id })
    .then(user => {
      console.log(user);
      res.status(200).json(user.notes);
    })
    .catch(err => {
      res.status(500).json({ Error: `Unable to get notes: ${err}` });
    });
};

module.exports = noteGet;
