exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments();
     table
      .string('name', 128)
      .notNullable()
      .unique('name');
     table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};
 exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
