
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
      table.increments();
  
      table.string('username', 128)
          .notNullable()
          .unique();
      
      table.string('password', 128).notNullable();
      table.string('email', 128);
      table.json('roles');
  
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTableIfExists('users');
  };
  