
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', tbl => {
    tbl.increments();

    tbl.string('text').notNullable();

    tbl
      .integer('note_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('notes')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schma.dropTableIfExists('tags')
};
