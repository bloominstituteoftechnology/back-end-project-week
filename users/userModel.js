const db = require('../data/dbConfig')

const addUser = (user) => {
  return db('users').insert(user)
}

const deleteUser = (id) => {
  return db('users').where('id', id).del()
}

module.exports = {
  addUser,
  deleteUser
}