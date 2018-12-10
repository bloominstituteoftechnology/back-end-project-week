
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', note => {
    // schema
    // id | title | content
    note
      .increments('id')
      .primary()

    note.string('title', 128).notNullable()

    note.string('content', 1024)

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes') 
};
