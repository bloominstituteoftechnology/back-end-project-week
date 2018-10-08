const db = require('../dbConfig.js');

module.exports = {
  getUserByName,
  add,
};


function getUserByName(username){
        return db('users').where('username', username).first();
}


function add(user) {
  return db('users')
    .insert(user)
    .returning('id')
    .then(ids => ids[0]);
}
