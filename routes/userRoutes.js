const users = require('../controllers/userController');

module.exports = userRoutes => {
  userRoutes.post('/signup', (req, res) => {
    users.registration
  });
  userRoutes.post('/signin', (req, res) => {
    users.logIn
  });
};