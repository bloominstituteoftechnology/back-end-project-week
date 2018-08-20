const db = require('../dbConfig.js');

module.exports = {
  get: function(id) {
    let query = db('users').select();
    if (id) {
      query.where('id', Number(id)).first();
    }
    return query;
  },
  update: function(id, user) {
    return db('users')
      .where('id', id)
      .update(user);
  },
  remove: function(id) {
    return db('users')
      .where('id', id)
      .del();
  },
};
