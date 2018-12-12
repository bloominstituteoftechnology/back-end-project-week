const db = require('../dbConfig')

module.exports = {
  getUserList: () => db('users'),

  addUser: user => db('notes')
    .insert(user, 'id'),

  getUser: id => db('users')
    .where({id: id}),

  updateUser: user => db('notes')
    .where({id: user.id})
    .update(user),

  deleteUser: id => db('users')
    .where({id: id})
    .del()
}