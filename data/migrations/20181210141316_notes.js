
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', tbl =>{
      tbl.increments();
      tbl.string('title', 128).unique().notNullable();
      tbl.string('textBody', 500).notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes')
};
