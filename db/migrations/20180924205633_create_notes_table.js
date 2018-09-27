exports.up = function(knex, Promise) {
  return knex.schema.createTable("Notes", table => {
    table.increments('id').primary();
    table.string("title", 128).notNullable();
    table.text("content").notNullable();
    table.text("tags");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("Notes");
};
