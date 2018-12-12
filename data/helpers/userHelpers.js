const db = require('../dbConfig')
const bcrypt = require('bcryptjs')

module.exports = {
  getUserList: () => db('users'),

  addUser: user => {
    const { password } = user
    user.password = bcrypt.hashSync(password, 10)
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