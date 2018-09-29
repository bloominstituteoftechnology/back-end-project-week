exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("notes", notes => {
      notes.increments();
      notes.string("title").notNullable();
      notes.string("text");
    })
    .then(() => {
      return knex.schema.createTable("tags", tags => {
        tags.increments();
        tags.string("tag");
        tags
          .integer("noteId")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("notes")
          .onDelete('CASCADE');
      });
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notes").then(() => {
    return knex.schema.dropTableIfExists("tags");
  });
};
