
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', function(tbl){
      tbl.increments();
      tbl.string('title', 100);
      tbl.string('body').notNullable();
      tbl.integer('user_id').unsigned().references('id').inTable('users');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes')
};
