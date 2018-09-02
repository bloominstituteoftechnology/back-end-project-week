exports.up = knex => knex.schema
  .createTable('notes', (notes) => {
    notes.increments('id');
    notes.string('title', 36).unique();
    notes.text('text_body');
    notes.timestamp('created_at').defaultTo(knex.fn.now());
    notes.integer('user_id').references('users.id');
    notes.integer('left');
    notes.integer('right');
    // notes.unique(['user_id', 'left']);
    // notes.unique(['user_id', 'right']);
  })
  // .then(result => knex
    // .raw('ALTER TABLE "notes" ADD CONSTRAINT left_unique UNIQUE ("user_id", "left") DEFERRABLE INITIALLY DEFERRED;')
    // .then(knex.raw('ALTER TABLE "notes" ADD CONSTRAINT right_unique UNIQUE ("user_id", "right") DEFERRABLE INITIALLY DEFERRED;')));

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
