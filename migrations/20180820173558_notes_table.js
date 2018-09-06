
exports.up = function(knex, Promise) {
 return knex.schema.createTable('notes', notes => {
     notes.increments()

     notes
     .string('title')
     .notNullable()
     .unique()

     notes
     .string('textBody')
     .notNullable()
 }) 
};

exports.down = function(knex, Promise) {
  
};
