const {createUser, loginUser} = require('../controllers/userControllers');

module.exports = app => {
  app.post('/new-user',createUser);
  app.post('/login', loginUser);
};
