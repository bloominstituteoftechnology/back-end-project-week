const bcrypt = require('bcrypt');

module.exports = [
  { username: 'user1', password: bcrypt.hashSync('1234', 14) },
];
