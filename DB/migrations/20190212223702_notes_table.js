
exports.up = function(knex, Promise) {
 return knex.schema.createTable('notes', table => {

 })
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTableIfExists('notes')
};
