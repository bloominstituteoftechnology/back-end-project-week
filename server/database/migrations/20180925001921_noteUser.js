
exports.up = function(knex, Promise) {
  return knex.schema.createTable('noteUser', table => {
    // id (PK)
    table.increments('id')
    // userId (FK from users)
    table.integer('userId')
    table.foreign('userId').references('users.userId')
    // noteId (FK from notes)
    table.integer('noteId')
    table.foreign('noteId').references('notes.noteId')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('noteUser')
};
