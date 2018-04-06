const userSchema = require('../models/userSchema');

const addUser = (req, res) => {
  const { username, hashpassword } = req.body;
  const newUser = new userSchema({ username, hashpassword });
  newUser
    .save()
    .then(user => {
      res.status(200).send(user);
    })
    .catch(err => {
      res.status(500).send({ err });
    });
};
module.exports = {
  addUser,
}