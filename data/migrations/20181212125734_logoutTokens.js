
exports.up = function(knex, Promise) {
  return knex.schema.createTable('logout', tbl => {
    tbl.increments();
    tbl.string('invalidToken', 255).notNullable().unique();
    tbl.timestamp('logged_out_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('logout');
};
