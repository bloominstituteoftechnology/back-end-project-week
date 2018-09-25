const db = require('../dbConfig.js');

module.exports = {
  get: function(id){
    let query = db('notes');
    return query;
  },

  insert: function(note){
    return db('notes')
      .insert(note)
      .then(([id]) => { this.get(id) });
  },

  update: function(id, changes){
    return db('notes')
      .where({'id': id})
      .update(changes);
  },

  delete: function(id){
    return db('notes')
      .where({'id': id})
      .delete()
      .then(()=>{this.get()});
  }
}