const userSchema = require('./models/userSchema');

const addUser = (req, res) => {
  const { username, hashpassword } = req.body;
  const newUser = new User({ username, hashpassword });
  newUser
    .save((err, addedUser) => {
      if (err) {
        res.status(500).json(err);
        return;
      }
      res.json(addedUser);
    });
};

const userLogin = (req, res) => {
  const { username, hashpassword } = req.body;
  userSchema.findOne({ username }, (err, user) => {
    if (err) {
      res.status(403).json({ error: 'Try Again, Invalid Input' });
      user.checkPassword(hashpassword, (match, notMatch) => {
        if (notMatch) {
          res.status(400).json({ error: 'invalid password' });
          return;
        }
        if (match) {
          res.status(200).json(user);
        }
      });
    };
  });
};

module.exports = {
  addUser,
  userLogin
};