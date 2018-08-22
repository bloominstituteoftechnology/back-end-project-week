
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', tbl => {
      // Foreign Key
      tbl
        .integer('note_id')
        .notNullable()
        .references('id')
        .inTable('notes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      tbl
        .string('tag', 256)
        .notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tags')
};
