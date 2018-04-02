const User = require('../models/User');

const createUser = (req, res) => {
  const { email, password } = req.body;
  const newUser = { email, password };
  const user = new User(newUser)
  user.save((err, createdUser) => {
    if (err) {
      res.status(422);
      res.send({'Error inserting into users: ': err.message});
      return;
    }
    res.json(createdUser);
  });
};

const login = async function(req, res) {
  const { email, password } = req.body;
  const formattedEmail = email.toLowerCase();
  console.log(formattedEmail);
  try {
    const user = await User.findOne({ email: formattedEmail });
    if (user === null) {
      res.status(422).json({ error: "No user with that email in our DB" });
      return;
    }
    const userIsValidated = await user.checkPassword(password);
    if (userIsValidated) {
      res.status(200).json(user);
    } else {
      res.status(422).json({ error: "Invalid Password!" });
    }
  } catch (err) {
    res.status(403).json({ error: "Invalid email/Password" });
  }
};

module.exports = {
  createUser,
  login,
};