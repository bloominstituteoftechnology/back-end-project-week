exports.up = function(knex, Promise) {
  return knex.schema.createTable("tags", table => {
    table.increments("id");
    table
      .integer("note_id")
      .unsigned()
      .notNullable();
    table
      .foreign("note_id")
      .references("id")
      .on("notes")
      .onDelete('CASCADE');
    table.string("tag").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("tags");
};
