
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', tbl => {
      tbl.increments();
      tbl.string('title', 255).notNullable()
      tbl.string('content',1000).notNullable()
      tbl.timestamp('createdAt').defaultTo(knex.fn.now())
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('notes');
  };