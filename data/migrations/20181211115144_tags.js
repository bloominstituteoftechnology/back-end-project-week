exports.up = function(knex, Promise) {
  return knex.schema.createTable("tags", tag => {
    tag.increments();
    tag
      .string("tag", 55)
      // .unique()
      .notNullable();
    tag
      .integer("note_id")
      .unsigned()
      .references("id")
      .inTable("notes");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("tags");
};
