const userSchema = require('../models/userSchema');

const addUser = (req, res) => {
  const { username, hashpassword } = req.body;
  const newUser = new userSchema({ username, hashpassword });
  newUser
    .save((err, addedUser) => {
      if (err) {
        res.status(500).json(err);
        return;
      }
      res.json(addedUser);
    });
};
module.exports = { 
  addUser,
}