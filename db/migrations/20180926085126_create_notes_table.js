exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', function(tbl){
        tbl.increments();
        tbl.string('textBody');
        tbl.string('tags');
        tbl.integer('userid')//this should be owner 
           .unsigned()
           .notNullable()
           .references('id')
           .inTable('users')
        tbl.bool('isPublic')
            .notNullable()
            .defaultsTo(false)
        tbl.integer('parent_id')
            .unsigned()
            .references('id')
            .inTable('notes');
        tbl.bool('hasChildren')
            .defaultsTo(false);
        tbl.bool('isDeleted')
            .defaultsTo(false);
        tbl.string('note_color');
        tbl.string('links');
        //collaborators
        //created att 
        //modified att
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
};

//knex migrate:make migration_name
//knex migrate:latest
