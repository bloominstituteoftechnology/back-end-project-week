
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', table => {
    table.increments()
    
    table.string('title', 255).notNullable();
    table.string('content', 10000).notNullable();
    table.boolean('completed').notNullable()

    table.timestamp('time_posted')
    table.timestamp('time_updated')

    table.integer('user_id').unsigned()
    table.foreign('user_id').references('id').on('users')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes')
};
