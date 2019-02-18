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

function findByEmail(email) {
   return db('users').where('email', email).first();
   // console.log(`Working now`);
};

function checkIfUserExists(user) {
   return db('users').where({
      email:user.email
    }).select('id');
}

module.exports = {
      insert,
      getUsers, 
      getById,
      remove, 
      update,
      checkIfUserExists,
      findByEmail
}