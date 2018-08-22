
exports.up = function(knex, Promise) {
  return knex.schema.createTable( 'notes', note => {
    note.increments();
    note
        .string('title')
        .notNullable()
        .unique()
    note
        .string('content')
        .notNullable()
        .unique()
  })
};

exports.down = function(knex, Promise) {
  
};
