const userSchema = require('./models/userSchema');

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
  userLogin,
};