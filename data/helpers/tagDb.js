const db = require('../db');
// const m = require('./mapper');

module.exports = {
    get: function(id) {
      let query = db('tags');
      if (id) {
        query.where('id', id).first();
      }
  
      return query;
    },
    add: function(tag) {
      return db('tags')
        .insert(tag)
        .then(ids => ({ id: ids[0] }));
    },
    edit: function(id, tag) {
      return db('tags')
        .where('id', id)
        .update(tag);
    },
    drop: function(id) {
      return db('tags')
        .where('id', id)
        .del();
    },
  };