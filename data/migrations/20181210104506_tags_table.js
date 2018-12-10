
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tags', (tbl)=>{
        tbl.increments()
        tbl.integer('note_id').unsigned().references('notes.id')
        tbl.string('tag')
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('tags')
  };
  
