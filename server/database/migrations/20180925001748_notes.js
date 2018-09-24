
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', table => {
    // noteId (PK)
    table.increments('noteId')
    // title
    table.string('title', 128)
    // content 
    table.string('content', 128)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes')
};
