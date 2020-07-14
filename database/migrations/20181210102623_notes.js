
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', (tbl) => {
      tbl.increments();
      tbl.string('title', 250).notNullable();
      tbl.string('textBody');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('notes');
};



//many posts to one user
//tags many to one post