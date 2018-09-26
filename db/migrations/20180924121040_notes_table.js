
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', function(tbl) {
        tbl.increments();
  
        tbl
          .string('title', 128)
          .notNullable()

        tbl
        .string('textBody')
        .notNullable()

        //tbl.specificType('tags', 'array')
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
};
