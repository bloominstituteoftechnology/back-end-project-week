const db = require('../dbConfig.js');

function insert(user) {
   return db('users').insert(user);
}

function getUsers() {
   return db('users');
}

function getById(id) {
   return db('users')
           .where('id', id)
           .first();
}

function remove(id) {
   return db('users')
           .where('id', id)
           .del();
}

function update(id, user) {
   return db('users')
          .where('id', id)
          .update(user);
}

function findByUsername(username) {
   return db('users').where('username', username).first();
};

function checkIfUserExists(user) {
   return db('users').where({
      username:user.username
    }).select('id');
}

module.exports = {
      insert,
      getUsers, 
      getById,
      remove, 
      update,
      checkIfUserExists,
      findByUsername
}