const db = require('../data/dbConfig')

const addUser = (user) => {
  return db('users').insert(user)
}

const getUser = (username) => {
  return db('users').where('username', username)
}

const deleteUser = (id) => {
  return db('users').where('id', id).del()
}

module.exports = {
  addUser,
  getUser,
  deleteUser,
}