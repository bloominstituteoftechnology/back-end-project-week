
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', tbl => {
    tbl.increments();

    tbl
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    tbl.string('title').notNullable();
    tbl.text('textBody');
    tbl.boolean('completed').defaultTo(false);


  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
