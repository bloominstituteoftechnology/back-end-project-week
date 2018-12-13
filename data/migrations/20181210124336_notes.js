
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', tbl => {
      tbl.increments();
      tbl.string('Title', 1024).notNullable();
      tbl.string('Content', 7168).notNullable();
      tbl.integer('user_id').unsigned().notNullable();
      tbl.foreign('user_id').references('id').inTable('users');
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
};
