
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('notes', tbl => {
      tbl.increments('id').primary();
      tbl.string('title').notNullable();
      tbl.string('content').notNullable();
      tbl.timestamp('created_at').defaultTo(knex.fn.now());
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('notes')
  ])
};
