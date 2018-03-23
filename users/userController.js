const knex = require('../database/db.js');

const db = {

  getAll() {
    return knex('users');
  },

  addUser(newUser) {
    return knex.insert(newUser).into('users');
  },

  getById(id) {
    return knex('users').where({id});
  },

  getPostsByUser(userId) {
    return knex('posts').where('user_id', userId);
  },

  updateUser(id, updatedUser) {
    return knex('users').where({id}).update(updatedUser);
  },

  nuke(id) {
    return knex('users').where({id}).del();
  },
  
}

module.exports = db;