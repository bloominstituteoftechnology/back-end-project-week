const User = require('./userModels');
const bcrypt = require('bcrypt');

const createUser = (req, res) => {
  const { username, password } = req.body;
  const user = new User(req.body);
  user
    .save()
    .then((user) =>
      res.status(201).json({
        success: true,
        user,
      })
    )
    .catch((err) => res.status(500).json({ err: err.message }));
};

module.exports = createUser;
