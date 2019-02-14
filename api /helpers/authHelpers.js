const knex = require('knex');
const db = require('../dbConfig');

module.exports = {
  insertUser: (user) => {
    return db('users').insert(user);
  },
  findByUsername: (username) => {
    return db('users').where('username', username).first();
  },
  findByID: (id) => {
    return db('users').where('id', id).first();
  }
}