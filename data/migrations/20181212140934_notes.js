exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', function(tbl){
        tbl.increments();
        tbl.string('title', 100);
        tbl.string('textBody').notNullable();
        // tbl.integer('id');
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes')
  };
