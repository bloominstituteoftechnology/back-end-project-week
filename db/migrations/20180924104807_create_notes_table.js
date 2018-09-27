exports.up = function(knex, Promise) {
  return knex.schema.createTable("Notes", table => {
    table.increments("id").primary();
    table.string("title", 120).notNullable();
    table.text("content").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("Notes");
};
