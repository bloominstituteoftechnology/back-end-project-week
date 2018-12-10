exports.up = function(knex, Promise) {
    return knex.schema.createTable("notes", function(tbl) {
  
      tbl.increments();
      tbl.string("title").notNullable();
      tbl.text("content").notNullable();  
      tbl
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users');
    })
  };
  
  exports.down = function(knex, Promise) {
    // undoes the changes to the database (rollback)
    return knex.schema.dropTableIfExists("notes");
  };