const db = require('../dbConfig.js');

module.exports = {
  get: function(id){
    let query = db('notes');
    return query;
  },

  insert: function(note){
    return db('notes')
      .insert(note)
      .then(([id]) => { return this.get(id) });
  },

  update: function(id, changes){
    return db('notes')
      .where({'id': id})
      .update(changes)
      .then(() => { return this.get() });
  },

  delete: function(id){
    console.log('id where id should be id', id);
    
    return db('notes')
      .where({'id': id})
      .delete()
      .then(()=>{ return this.get()});
  }
}