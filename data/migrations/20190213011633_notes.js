
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', notes =>{
    notes.increments();
    notes.string('title').notNullable();
    notes.text('textBody').notNullable();
    notes.string('author');
    notes.datetime('published_date');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
