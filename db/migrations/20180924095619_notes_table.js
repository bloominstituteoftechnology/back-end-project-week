
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', (tbl)=>{
    tbl.increments();
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.string('title', 128).notNullable();
    tbl.text('content');
    tbl.boolean('completed');
  });
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('notes');
};
