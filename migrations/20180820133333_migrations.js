
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', function(table) {
      table.increments();
      table.string('username').notNullable().unique();
      table.string('password').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
  .createTable('post', function(table) {
      table.increments();
      table.string('title', 128).notNullable();
      table.integer('userId').references('id').inTable('user');
      table.string('textBody');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
  .createTable('tags', function(table) {
      table.increments();
      table.string('tag', 28).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
  .createTable('posttags', function(table) {
      table.increments();
      table.integer('postId').references('id').inTable('post');
      table.integer('tagId').references('id').inTable('tags');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user')
  .dropTable('post')
  .dropTable('tags')
  .dropTable('posttags')
};
