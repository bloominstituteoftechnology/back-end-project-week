const bcrypt = require('bcrypt');

module.exports = [
  { username: 'user1', password: bcrypt.hashSync('1234', 14) },
  { username: 'user2', password: bcrypt.hashSync('2234', 14) },
];
