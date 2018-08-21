
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('notes', tbl => {
      tbl.increments('id').primary();
      tbl.string('title').notNullable();
      tbl.text('textBody').notNullable();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('notes')
  ])
};
