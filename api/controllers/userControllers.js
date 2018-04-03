const User = require('../models/userModels');

const createUser = (req, res) => {
  const { username, password } = req.body;
  const newUser = { usernmame, password };
  const user = new User(newUser);
  user.save( (err, createdUser) => {
    if (err) {
      res.status(422);
      res.json( {'Error inserting into users': err.message} );
      return;
    }
    res.json(createdUser);
  });
};

  const login = (req, res) => {
    const { username, password } = req.body;
    const userToLogin = {usernmame, password};
    User.findOne(userToLogin, (err, user) => {
      if (err) {
        res.status(422);
        res.json( {'User not in DB': err.message} );
        return;
      }
      res.json(user);
    });
  };

  module.exports = { createUser, login };
