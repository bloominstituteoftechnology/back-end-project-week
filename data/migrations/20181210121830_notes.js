
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', tbl => {
    tbl.increments();
    tbl.string('title', 128).notNullable();
    tbl.text('textBody');
    tbl.string('tags', 255);
    tbl.integer('user_id').unsigned().notNullable();
    tbl.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('last_updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
};
