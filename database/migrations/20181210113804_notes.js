
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', table => {

       table.increments();
       table.string('title', 128).notNullable();
       table.string("textBody", 256);
       table.json('tags');
       table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable();

    })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
