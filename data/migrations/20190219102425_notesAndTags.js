exports.up = function(knex, Promise) {
  return knex.schema.createTable("notesAndTags", table => {
    table.integer("note_id").notNullable();
    table.integer("tag_id").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notesAndTags");
};
