//mock data for testing api
exports.up = function(knex, Promise) {
   return knex.schema.createTable("notes", function (table) {
      table.increments();
      table.string("title").notNullable();
      table.string("contents").notNullable();
      table.string("author");
   })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists();
};
