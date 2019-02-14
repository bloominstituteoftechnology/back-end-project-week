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
}

