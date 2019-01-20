const bCrypt = require('bcryptjs');
const axios = require('axios');
const usersControllers = require('../data/userscontrollers');
const {
  authenticate,
  secret,
  jwt,
  validateNewUserCred,
} = require('./middleware.js');

module.exports = (server) => {
  server.post('/api/register', validateNewUserCred, register);
  server.post('/api/login', login);
  server.get('/api/notes', authenticate, getNotes);
};
generateToken = (user) => {
  const payload = {
    username: user.username,
  };
  const options = {
    expiresIn: '24h',
    subject: user.id.toString(),
  };
  return jwt.sign(payload, secret, options);
};

function register(req, res) {
  const newUser = req.body;
  const hash = bCrypt.hashSync(newUser.password, 3);
  newUser.password = hash;
  newUser.username = newUser.username.toLowerCase();
  usersControllers
    .registerNewUser(newUser)
    .then((id) => {
      const userId = id[0];
      const token = generateToken({ username: newUser.username, id: userId });
      const responseObj = {
        token: token,
        user_id: userId,
      };
      res.status(201).json(responseObj);
    })
    .catch((err) => res.status(500).json(err));
}
function login(req, res) {
  const loggedIn = req.body;
  usersControllers
    .logInUser(loggedIn)
    .then((user) => {
      const currentUser = user[0];
      if (
        loggedIn &&
        bCrypt.compareSync(loggedIn.password, currentUser.password)
      ) {
        const token = generateToken(currentUser);
        const responseObj = {
          token: token,
          user_id: currentUser.id,
        };
        res.status(200).json(responseObj);
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch((err) => res.status(500).json(err));
}
function getNotes(req, res) {
  axios
    .get(`https://notes-lambda.herokuapp.com/note/get/all/${req.headers.id}`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) =>
      res.status(500).json({ message: 'Error fetching notes.', error: err })
    );
}
