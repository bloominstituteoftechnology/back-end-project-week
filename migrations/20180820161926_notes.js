
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', tbl => {
    tbl.increments('id');

    tbl
        .string('title', 128)
        .notNullable()
        .unique()

    tbl
        .text('noteBody')
        .defaultTo('')

    tbl
        .integer('note_id')
        .unsigned()
        .references('id')
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes')
};
