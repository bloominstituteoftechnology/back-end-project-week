const User = require('../models/userModel');

const createUser = (req, res) => {
  const { email, password } = req.body;

  const newUser = new User({ email, password });

  //prettier is not being very pretty right now, I will fix it later(if I have times)
  //!!!!!!!!!!!!!!!!!!!
  //need no info error and duplicate error rejection msgs
  newUser.save().then(userInfo => {
    res
      .json({
        success: 'Successfully created a new user',
        userInfo,
      })
      .catch(err => {
        res.status(422).json({
          Error: 'There was an error creating the user',
          err,
        });
      });
  });
};

module.exports = {
  createUser,
};
