const db = require('../dbConfig/db');

module.exports = {
  registerNewUser,
  logInUser,
};
function registerNewUser(newUser) {
  return db('users').returning('id').insert(newUser);
}
function logInUser(loggedIn) {
  return db('users').where({ username: loggedIn.username });
}
