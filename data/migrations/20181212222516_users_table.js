
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (tbl) =>{
      tbl.increments();
      tbl.string('username').unique();
      tbl.string('password');
      tbl.string('email');
      tbl.integer('googleID').unique();
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTableIfExists('users');
  };
