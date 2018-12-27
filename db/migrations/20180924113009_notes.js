
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', function(table){
      table
      .increments(); //auto increment id

      table
      .string('name', 128)
      .notNullable()
      .unique('name');

      table
      .text('content')
      .notNullable();
      
      table
      .timestamp('created_at')
      .defaultTo(knex.fn.now())
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('notes');
};
