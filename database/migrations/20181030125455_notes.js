
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', function(tbl) {
        tbl.increments('id');
        tbl
            .string('title', 80)
            .notNullable();
        tbl
            .string('content', 500)
            .notNullable();
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
};