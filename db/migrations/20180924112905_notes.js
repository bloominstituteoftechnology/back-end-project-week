exports.up = (knex, Promise) => {
  return knex.schema.createTable('notes', (tbl) => {
    tbl.increments();
    tbl.string('title').notNullable();
    tbl.string('text');
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('notes');
};
