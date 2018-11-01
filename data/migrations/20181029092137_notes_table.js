
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', notes => {
    notes.increments(); // primary key called id

    notes.string('title', 40).notNullable(); // name field

    notes.text('textBody', 1000).notNullable(); // description field
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
