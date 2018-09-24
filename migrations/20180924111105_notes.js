
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', function(tbl) {
      tbl.increments();
  
      tbl.string('note').notNullable();
  
      tbl.integer('note_id').unsigned().notNullable().references('id').inTable('users')
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('notes')
  };
  