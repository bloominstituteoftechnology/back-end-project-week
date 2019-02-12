exports.up = function(knex, Promise) {
  return knex.schema.createTable("tagNote", table => {
    table.increments();
    table.integer("tag_id").notNullable();
    table
      .foreign("tag_id")
      .references("id")
      .on("tags");
    table.integer("note_id").notNullable();
    table
      .foreign("note_id")
      .references("id")
      .on("notes");
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTableIfExists("tagNote");
};
