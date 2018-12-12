const db = require('../dbConfig')
const bcrypt = require('bcryptjs')

const hashPass = function() {
  this.password = bcrypt.hashSync(this.password, 10) 
}

module.exports = {
  getUserList: () => db('users'),

  addUser: user => {
    // const { password } = user
    // user.password = bcrypt.hashSync(password, 10)
    hashPass.call(user)
    return db('users')
      .insert(user, 'id')
  },

  getUser: id => db('users')
    .where({id: id}),

  updateUser: user => {
    const { password } = user
    user.password = bcrypt.hashSync(password, 10)
    return db('users')
      .where({id: user.id})
      .update(user)

  },

  deleteUser: id => db('users')
    .where({id: id})
    .del()
}