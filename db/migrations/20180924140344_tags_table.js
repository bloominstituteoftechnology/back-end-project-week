
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', tags => {
    tags.increments('tagId');

    tags.string('tag_title').notNullable().unique();

    tags
      .int('noteId')
      .unsigned()
      .notNullable()
      .references('noteId')
      .inTable('notes');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tags');
};
