
exports.up = function(knex, Promise) {
  knex.schema.createTable('users', function(table){
    table.increments('userId');
    table.string('name').notNullable().unique();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
