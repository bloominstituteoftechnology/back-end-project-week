exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', () => {
    t.increments('id').primary();
    t.integer('user_id').unsigned();
    t.foreign('user_id').references('users.id');
    t.string('title').notNullable();
    t.string('body').notNullable();
  });
};

exports.down = function(knex, Promise) {};
