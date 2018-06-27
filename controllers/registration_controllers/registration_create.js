const jwt = require('jsonwebtoken');

const User = require('../../database/models/UserModel');
const { JWT_SECRET } = process.env;
const {
  successful: { created },
  clientError: { badRequest },
  serverError
 } = require('../../http_status_codes');

const registrationCreate = (req, res) => {
  const user = ({ username, password } = req.body);

  User.create(user)
    .then(user => {
      // create a JWT
      jwt.sign({ username: user.username }, JWT_SECRET, (err, token) => {
        if (err)
          return res.status(badRequest).json({
            status: badRequest,
            statusMessage: 'Error while attempting to create your web token. Try again in a few minutes'
          });

        // return JWT and more to user
        res.status(201).json({
          token,
          status: created,
          statusMessage: 'Account successfully created.'
        });
      });
    })
    .catch(err => {
      if (!username || !password)
        return res.status(badRequest).json({
          status: badRequest,
          statusMessage: 'Please supply a valid username and password before attempting to register again.'
        });

      if (/username/.test(err.message))
        return res.status(badRequest).json({
          status: badRequest,
          statusMessage: 'Woops! There\'s already another user with that name, try another one'
        });
      
      res.status(serverError).json(err);
    });
};

module.exports = registrationCreate;