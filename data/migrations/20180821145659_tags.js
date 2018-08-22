
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', tbl => {
    tbl.increments();
    tbl.string('tag').notNullable();
    tbl.integer('note_id').notNullable().references('id').inTable('notes').onUpdate('CASCADE').onDelete('CASCADE');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tags');
};
