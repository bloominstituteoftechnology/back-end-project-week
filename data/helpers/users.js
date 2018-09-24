const db = require('../dbConfig');

module.exports = {
  get: function(id) {
    let query = db('users');

    if(id){
      query.where({ id }).first();
    }

    return query;
  }, //returns array of users or user object if given id
  getByUsername: function(username) {
    let query = db('users').where({ username }).first();
    return query;
  }, //returns user found with username
  add: function(user) {
    let query = db('users').insert(user);
    return query;
  }, //end adding a new user, returns user object
}
