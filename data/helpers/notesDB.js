const db = require('../dbConfig.js');

module.exports = {
  get: function(id) {
    let query = db('notes').select();
    if (id) {
      query.where('id', Number(id)).first();
    }
    return query;
  },
  getByUser: function(u_id) {
    return db('notes')
      .select()
      .where('u_id', Number(u_id));
  },
  update: function(id, note) {
    return db('notes')
      .where('id', id)
      .update(note);
  },
  remove: function(id) {
    return db('notes')
      .where('id', id)
      .del();
  },
};
