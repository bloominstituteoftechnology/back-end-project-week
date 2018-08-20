exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', () => {
    t.increments('id').primary();
    t.string('username').notNullable();
    t.string('password');
  });
};

exports.down = function(knex, Promise) {};
