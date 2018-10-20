const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const User = require('../../database/models/UserModel');
const {
  clientError: { badRequest },
  serverError
} = require('../../http_status_codes');

const registraionLogin = (req, res) => {
  const user = ({ username, password } = req.body);

  User.findOne({ username })
    .then(async (user) => {
      if (!username || !password)
        return res.status(badRequest).json({
          status: badRequest,
          statusMessage: 'Please provide a valid username and password before attempting to log in.'
        });

      // binding and calling the `User.verifyPassword` static method
      const isCorrectPassword = await User.verifyPassword.bind(user)(password);

      // if password is incorrect send them packin!
      if (!isCorrectPassword)
        return res.status(badRequest).json({
          status: badRequest,
          statusMessage: 'The username and password combination do not match our records.'
        });

      // if after all that everything is good to go log the user in and return their JWT for easy auth in the future
      jwt.sign({ username: user.username }, JWT_SECRET, (err, token) => {
        if (err)
          return res.status(serverError).json({
            status: serverError,
            statusMessage: 'Sorry but there was an error while trying to create your token. Please try again in a few minutes'
          });

        res.json({ token });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(serverError).json(err);
    });
};

module.exports = registraionLogin;