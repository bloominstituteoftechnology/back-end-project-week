exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', function(tbl) {
      tbl.increments();
  
      tbl.string('title', 50).notNullable();

      tbl.string('content').notNullable();
  
      tbl.integer('user_id').unsigned().notNullable().references('id').inTable('users')
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTableIfExists('notes')
  };
  