
exports.up = function(knex, Promise) {
return knex.schema.table('notes', function(notes) {
        notes.text('image');
    });  
};

exports.down = function(knex, Promise) {
   return knex.schema.table('notes', function(notes) {
        notes.dropColumn('image');
    });
};
