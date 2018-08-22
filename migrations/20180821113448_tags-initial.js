exports.up = function (knex, Promise) {
  return knex.schema.createTable('tags', (tags) => {
    tags.increments('id');
    tags.string('name', 18).unique();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('tags');
};
