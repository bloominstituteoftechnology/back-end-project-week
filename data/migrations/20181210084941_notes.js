
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', tbl => {
      tbl
        .increments()
      tbl
        .string('title')
        .notNullable()
      tbl
        .string('content')
        .notNullable()
      tbl
        .integer('userId') 
        .unsigned()
        .references('id')
        .inTable('users')     
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes')
};
