
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', notes => {
        notes.increments('id');
        notes
        .string('title', 128)
        .notNullable()
        .unique();
        notes.string('textBody', 128).notNullable();
        notes.string('tags').notNullable();
        notes.integer('_id').unsigned().notNullable();
        notes.integer('users_id').unsigned();
        notes.foreign('users_id').references('id').on('users');

    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
  };
  