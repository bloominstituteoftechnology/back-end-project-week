
exports.up = function(knex, Promise) {
  return knex.schema.createTable('logout', tbl => {
    tbl.string('invalidToken', 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('logout');
};
