
exports.up = function(knex, Promise) {
 return knex.schema.createTable('notes', table => {
  table.increments()
  table.string('title')
       .notNullable()
  table.text('body', mediumtext)
  table.integer('user_id')
       .signed()
       .references('id')
       .on('users')

 })
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTableIfExists('notes')
};
