const mongoose = require('mongoose');
const User = mongoose.model('User');

const Users = mongoose.model('User');

function setUserInfo(req) {
  const getUserInfo = {
    _id: req._id,
    username: req.username,
    email: req.email,
  };

  return getUserInfo;
}

// function validateEmail(email) {
//   const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(email);
// };

exports.createUser = (req, res) => {
  const { email, password } = req.body;

  const user = new User({ email, password });
  // console.log(validateEmail(email));

  // if (!email) {
  //   return res.status(422).json({ error: 'You must enter an email address.' });
  // }

  // if (!validateEmail(email)) {
  //   return res.status(422).json({ error: 'You must enter a valid email address.' });
  // }

  // // if (!username) {
  // //   return res.status(422).json({ error: 'You must enter a username.' });
  // // }

  // if (!password) {
  //   return res.status(422).json({ error: 'You must enter a password.' });
  // }


  user.save((error, newUser) => {
    if (error) return res.send(error);
    const userInfo = setUserInfo(newUser);
    res.status(201).json({
      token: getTokenForUser(userInfo),
      user: userInfo,
    });
  });
};

exports.getUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.send(err);
    res.send(users);
  });
};
