exports.up = function(knex) {
    return knex.schema.createTable('notes', tbl => {
        tbl.increments();
  
        tbl
            .string('title')
            .notNullable()
            .unique();
        tbl
            .string('note')
            .notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
  };