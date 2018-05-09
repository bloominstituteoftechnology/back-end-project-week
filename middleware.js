const config = require('./config')

const authUser = (req, res, next) => {
    if(req.session.loggedIn) {
        next();
    } else {
        sendUserError('You are not logged in.', res);
    }
};

const sendUserError = (err, res) => {
res.status(config.STATUS_USER_ERROR);
if (err && err.message) {
  res.json({ message: err.message, stack: err.stack });
} else {
  res.json({ error: err });
}
};

module.exports = { authUser, sendUserError };