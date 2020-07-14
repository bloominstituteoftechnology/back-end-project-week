exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', table => {
     table.increments();
     table.integer('userId').unsigned().references('id').inTable('users')
     table.string('text').notNullable();
     table.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};
 exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('posts');
};
