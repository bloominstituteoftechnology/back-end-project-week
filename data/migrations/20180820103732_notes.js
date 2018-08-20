exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', function(t) {
    t.increments(); // PK defaults to 'id'
    t.string('title').notNullable();
    t.string('content').notNullable();
    t.integer('u_id') // FK to users
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
