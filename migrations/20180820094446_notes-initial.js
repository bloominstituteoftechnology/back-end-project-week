exports.up = knex => knex.schema.createTable('notes', (notes) => {
  notes.increments('id');
  notes.string('title', 36).unique();
  notes.text('text_body');
  notes.timestamp('created_at').defaultTo(knex.fn.now());
  notes.integer('user_id').references('users.id');
  notes.integer('left');
  notes.integer('right');
  notes.unique(['user_id', 'left']);
  notes.unique(['user_id', 'right']);
});

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
