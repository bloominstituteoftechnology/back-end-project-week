exports.up = function(knex, Promise) {
    return knex.schema.createTable("users", function(tbl) {
  
      //primary key
      tbl.increments();
      tbl.string("username").notNullable();
      tbl.string("password").notNullable();
    })
  };
  
  exports.down = function(knex, Promise) {
    // undoes the changes to the database (rollback)
    return knex.schema.dropTableIfExists("users");
  };