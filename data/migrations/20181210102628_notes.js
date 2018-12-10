exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", tbl => {
    tbl.increments("_id");
    tbl.string("title");
    tbl.text("textBody");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableifExists("notes");
};
