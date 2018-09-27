exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', function(tbl) {
    tbl.increments();
    tbl.string('title', 255).notNullable();
    tbl.text('textBody').notNullable();
<<<<<<< HEAD
    tbl.integer('author_id').unsigned().notNullable().references('users.id');
=======
    tbl
      .integer('author_id')
      .unsigned()
      .notNullable()
      .references('users.id');
>>>>>>> master
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
