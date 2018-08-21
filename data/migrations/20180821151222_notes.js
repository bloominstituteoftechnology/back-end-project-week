exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', (table) => {
    table.increments();
    table.string('title', 40).notNullable();
    table.text('content').notNullable();
    table.integer('user_id')
         .references('id')
         .inTable('users')
         .onUpdate('CASCADE')
         .onDelete('CASCADE')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
