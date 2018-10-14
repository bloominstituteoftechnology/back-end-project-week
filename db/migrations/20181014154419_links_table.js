
exports.up = function(knex, Promise) {
    return knex.schema.createTable('links', function(tbl){
        tbl.increments();
        tbl.text('text').notNullable();
        tbl.integer('parent_id')
          .unsigned()
          .references('id')
          .inTable('notes')
          .defaultsTo(null);
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('links')
  };
  