const User = require("../models/User");

const makeUser = (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const newUser = new User({
    firstName,
    lastName,
    email,
    password
  });
  newUser.save(err, user => {
    if (err) return res.status(400).json({ message: "Could not save user" });
    else {
      res.json({ success: "The user was saved to the database", user });
    }
  });
  const logUser = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        res.status(500).json({ error: "Incorrect user or password" });
        return;
      }
      if (email === null) {
        res
          .status(422)
          .json({ error: "That user does not exist in the database" });
        return;
      }
      user.checkPassword(hashPass, doesEqual => {
        if (doesEqual) {
        }
      });
    });
  };
};
