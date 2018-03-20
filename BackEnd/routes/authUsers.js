const {  comparePassword, encryptPassword, login, sign_up }  = require('../controllers/authUser');

module.exports = server => {
    server.post('/login', comparePassword, login);
    server.post('/signup', encryptPassword, signup);
  }