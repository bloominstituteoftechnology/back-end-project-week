
exports.up = function(knex, Promise) {
return knex.schema.createTable('notes',notes=>{
  notes.increaments();
  notes.string('title',128).notNullable()
  notes.string('content',128).notNullable()
})
};

exports.down = function(knex, Promise) {
return knex.shema.dropTableIfExists('notes');
};
