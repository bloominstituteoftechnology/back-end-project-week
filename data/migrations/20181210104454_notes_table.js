
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', (tbl)=>{
      tbl.increments()
      tbl.string('title')
      tbl.text('content')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes')
};
