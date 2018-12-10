exports.up = function(knex, Promise) {
  return knex.schema.createTable("lists", lists => {
    lists.increments();
    lists.string("noteTitle", 128).notNullable();
    lists.string("noteBody", 5000).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("lists");
};
