
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', tbl => {
    tbl.increments();
    tbl.string('title', 128).notNullable();
    tbl.longtext('textBody');
    tbl.json('tags');
    tbl.integer('user_id').unsigned().notNullable();
    tbl.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
};
