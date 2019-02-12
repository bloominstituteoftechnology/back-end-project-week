
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', notes => {
        notes.increments('id');
        notes
        .string('title', 128)
        .notNullable()
        .unique();
        notes.string('textBody', 255).notNullable();
        notes.string('tags');
        notes.integer('_id').unsigned();
        notes.string('image', 255);
        notes.integer('users_id').unsigned();
        notes.foreign('users_id').references('id').on('users');

    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
  };
  