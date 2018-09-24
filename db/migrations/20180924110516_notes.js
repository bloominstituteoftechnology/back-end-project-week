
exports.up = function(knex, Promise) {
 return knex.schema.createTable('notes', tbl => {
     tbl.increments()

     tbl.string('title', 32).notNullable()

     tbl.string('contents', 1200)

 })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('notes')
};
