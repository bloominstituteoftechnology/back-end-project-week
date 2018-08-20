
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
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        
    });
};

exports.down = function(knex, Promise) {
  
};
