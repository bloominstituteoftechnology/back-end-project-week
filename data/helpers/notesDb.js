//grab knex configuration for accessing database
const notesDb = require('../dbConfig.js');

//create & export helper functions
module.exports = {
  getNotes: function(){
    return notesDb('notes');
  },

  getNotesById: function(id){
    return notesDb('notes')
    .where('id', id);
  },

  addNote: function(note){
    return notesDb('notes')
    .insert(note)
    .then(ids =>{
      return {id: ids[0]};
    })
  },

  updateNote: function(id, note){
    return notesDb('notes')
    .where('id', Number(id))
    .update(note)
  }
}

