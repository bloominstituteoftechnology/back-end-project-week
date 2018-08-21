
exports.up = function(knex, Promise) {
    return knex.schema.createTable('actions', action => {
        action.increments();
  
        action
        .string('description')
        .unique()
  
        action
        .text('notes')
        .notNullable()
       
  
        action
        .boolean('completed').defaultTo(false);
  
  
        action
        .integer('note_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('notes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        
    });
};

exports.down = function(knex, Promise) {
  
};
