const bcrypt = require('bcryptjs')
const testUsers = [
  {name: 'bob', email: 'bob@bob.com', 'password': 'pass1'},
  {name: 'alice', email: 'alice@bob.com', 'password': 'pass2'},
  {name: 'steve', email: 'steve@com.com', 'password': 'pass3'},
]
const hashPass = user => user.password = bcrypt.hashSync(user.password, 10)   
testUsers.map(hashPass)
exports.seed = function(knex) {
  return knex('users').insert(testUsers);
};
