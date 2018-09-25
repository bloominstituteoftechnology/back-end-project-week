exports.up = function(knex, Promise) {
  return knex.schema.createTable("tags", tags => {
    tags.increments();
    tags.string("tag", 128).notNullable();
    tags
      .integer("note_id")
      .unsigned()
      .references("notes.id");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("tags");
};
