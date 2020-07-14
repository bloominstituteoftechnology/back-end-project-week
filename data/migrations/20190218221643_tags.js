exports.up = function(knex, Promise) {
  return knex.schema.createTable("tags", table => {
    table.increments("id");
    table.string("tagName").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("tags");
};
