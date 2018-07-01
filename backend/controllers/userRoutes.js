const httpStatus = require('../utils/HTTPStatusCodes');
// Utils
const { generateToken } = require('../utils/controllers/authHelpers');
const { validateUserPostBody } = require('../utils/controllers/controllerHelpers');

module.exports = (usersModel) => {
  return {
    "REGISTER": (req, res) => {
      const newUser = validateUserPostBody(req.body);

      if (newUser.errorState) {
        const { status, error } = newUser;
        return res.status(status).json({ error });
      }

      usersModel.create(newUser)
        .then(user => {
          const token = generateToken(user);
          const { email } = user; // destructure to avoid sending hashed password back to the client.

          res.status(httpStatus.created).json({ email, token })
        })
        .catch(error => {
          console.log('userRoutes--Register-POST ERROR:',error);
          res.status(httpStatus.internalServerError).json(error);
        });
    },
    "LOGIN": (req, res) => {
      const loggingInUser = validateUserPostBody(req.body);

      if (loggingInUser.errorState) {
        const { status, error } = loggingInUser;
        return res.status(status).json({ error });
      }

      const { email, password } = loggingInUser;

      usersModel.findOne({ email })
        .then(user => {
          if (user) {
            user.validatePassword(password)
              .then(isValid => {
                if (isValid) {
                  const token = generateToken(user);
                  res.status(httpStatus.OK).json({ "Welcome": "Login Successful", token});
                } else {
                  res.statusMessage = "Login failed.";
                  res.status(httpStatus.unauthorized).end();
                }
              })
              .catch(err => {
                console.log(`${user.username} Validation Error:`,err);
                res.statusMessage = "Login failed.";
                res.status(httpStatus.unauthorized).end();
              });
          } else {
            res.statusMessage = "Login failed.";
            res.status(httpStatus.unauthorized).end();
          }
        })
      .catch(error => {
        console.log('LOGIN route ERROR:',error);
        res.status(http.internalServerError).end();
      });
    },
  };
}
