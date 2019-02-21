
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', function(tbl){
    tbl.increments();
    tbl.string('title', 120).notNullable();
    tbl.string('content', 1000).notNullable();
  });
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
