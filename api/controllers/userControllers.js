const User = require('../models/userModels');

const createUser = (req, res) => {
  // console.log(req.body);
  const { username, password } = req.body;
  const newUser = { username, password };
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
    console.log(req.body);
    const { username, password } = req.body;
    const userToLogin = {username, password};
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
