exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', t => {
    t.increments('id')
    t.string('title').notNullable()
    t.text('content').notNullable()
    t.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {   
  return knex.schema.dropTableIfExists('notes')
};
