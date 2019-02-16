exports.up = function(knex, Promise) {
  return knex.schema.table("notes", table => {
    table.integer("user_id").notNullable();
    table
      .foreign("user_id")
      .references("id")
      .in("users");
  });
};

exports.down = function(knex, Promise) {
//   return knex.schema.table("notes", table => {
//     table.
//   });
};
