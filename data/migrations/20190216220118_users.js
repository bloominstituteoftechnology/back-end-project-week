exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (table) {
         table.increments();
         table.string('username').notNullable().unique();
         table.string('password', 12).notNullable();
  });
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTableIfExists('users');
};

