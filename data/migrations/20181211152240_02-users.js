exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {

    // primary key
    // by default it generates an id field and make it autoincrement and the primary key. Default tbl.increments('id');
    table.increments('user_id');

    // other fields
    table.string('username', 128).notNullable().unique();
    table.string('password', 128).notNullable();
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
return knex.schema.dropTableIfExists('users');
};
