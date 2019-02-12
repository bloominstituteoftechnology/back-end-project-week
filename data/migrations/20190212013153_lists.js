
exports.up = function(knex, Promise) {
    return knex.schema.createTable('lists', lists => {
        lists.increments('id');
        lists.string('list', 128).notNullable();
        lists.integer('notes_id').unsigned();
        lists.foreign('notes_id').references('id').on('notes');
        lists.integer('users_id').unsigned();
        lists.foreign('users_id').references('id').on('users');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('lists');
  };