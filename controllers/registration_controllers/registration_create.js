const User = require('../../database/models/UserModel');
const { 
  successful: { created },
  clientError: { badRequest },
  serverError
 } = require('../../http_status_codes');

const registrationCreate = (req, res) => {
  const user = ({ username, password } = req.body);

  User.create(user)
    .then(user => {
      console.log(user);
      res.status(created).json({
        status: created,
        statusMessage: 'Account successfully created.'
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