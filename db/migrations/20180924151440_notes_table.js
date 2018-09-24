
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', tbl => {
      tbl.increments();
      tbl.string('name', 255).notNullable()
      tbl.unique('uq_notes_name').notNullable()
      tbl.string('description',1000).notNullable()
      tbl.timestamp('createdAt').defaultTo(knex.fn.now())
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('notes');
  };