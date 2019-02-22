const db = require('../dbConfig');

module.exports = {
  insertUser: (user) => {
    return db('users').returning('id').insert(user)
  },
  findByUsername: (username) => {
    return db('users').where('username', username).first();
  },
  findByID: (id) => {
    return db('users').returning('id').where('id', id).first();
  }
}