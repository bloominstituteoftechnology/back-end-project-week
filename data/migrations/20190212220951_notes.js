
exports.up = function(knex, Promise) {
    return knex.schema.createTable("notes", table => {
      table.increments("id").primary();
      table.string("title").notNullable();
      table.string("content").notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("notes");
  };
  