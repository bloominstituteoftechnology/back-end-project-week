const User = require("../models/UserModel");
const { makeToker } = require("../services/auth");

const makeUser = (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const user = new User({
    firstName,
    lastName,
    email,
    password
  });
  user.save((err, user) => {
    if (err) return res.send(err);
    res.status(200).json({ success: "user was saved", user });
  });
};

const logUser = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      res.status(500).json({ error: "Wrong username or password" });
      return;
    }
    if (email === null) {
      res.status(422).json({ error: "Could not find that user in the db" });
      return;
    }
    user.checkPassword(password, doesEqual => {
      if (doesEqual) {
        const token = makeToker({ email: user.email });
        res.json({ token });
      } else {
        res.status(422).json({ error: "Invalid username or password" });
      }
    });
  });
};

module.exports = { makeUser, logUser };
