
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tags', function(tbl) {
        tbl.increments();
  
        tbl
          .string('tag', 128)
          .notNullable();
  
        tbl
          .integer('note_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('notes');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('tags');
};
