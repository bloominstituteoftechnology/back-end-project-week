
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', user => {
    // schema
    // id | title | content
    user
      .increments('id')
      .primary()

    user.string('name', 128).notNullable()

    user.string('email', 1024)

    user.string('password', 1024)

    user.integer('join-date')

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users') 
};
