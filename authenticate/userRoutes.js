const bCrypt = require("bcryptjs");
const usersControllers = require("../data/userscontrollers");
const { secret, jwt, validateNewUserCred } = require("./middleware.js");

module.exports = server => {
  server.post("/api/register", validateNewUserCred, register);
  server.post("/api/login", login);
};
generateToken = user => {
  const payload = {
    username: user.username
  };
  const options = {
    expiresIn: "24h",
    subject: user.id.toString()
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
    .then(id => {
      const userId = id[0];
      const token = generateToken({ username: newUser.username, id: userId });
      let responseObj = {
        token: token,
        user_id: userId
      };
      res.status(201).json(responseObj);
    })
    .catch(err => res.status(409).json(err));
}
function login(req, res) {
  const loggedIn = req.body;
  loggedIn.username = loggedIn.username.toLowerCase();
  usersControllers
    .logInUser(loggedIn)
    .then(user => {
      const currentUser = user[0];
      if (
        loggedIn &&
        bCrypt.compareSync(loggedIn.password, currentUser.password)
      ) {
        const token = generateToken(currentUser);
        const responseObj = {
          token: token,
          user_id: currentUser.id
        };
        res.status(200).json(responseObj);
      } else {
        res.status(400).json({ message: "Invalid Credentials" });
      }
    })
    .catch(err => res.status(500).json(err));
}
