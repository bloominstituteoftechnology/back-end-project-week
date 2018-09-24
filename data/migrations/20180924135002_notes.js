
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', function(tbl){
    tbl.increments()
    tbl.string('title')
    tbl.string('textBody')
    tbl.integer('__v').defaultTo(0)
    tbl.integer("length")
    tbl.string("time")
    tbl.specificType('tags', 'text[]')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes')
};
