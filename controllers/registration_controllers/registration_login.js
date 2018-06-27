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
    .then(user => {
      if (!username || !password)
        return res.status(badRequest).json({
          status: badRequest,
          statusMessage: 'Please provide a valid username and password before attempting to log in.'
        });

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