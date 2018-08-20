
exports.up = function(knex, Promise) {
 return knex.schema.createTable('notes', notes => {
     project.increments()

     notes
     .string('title')
     .notNullable()
     .unique()

     notes
     .boolean('completed').defaultTo(false);
 }) 
};

exports.down = function(knex, Promise) {
  
};
