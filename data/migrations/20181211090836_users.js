
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments()
        tbl.text('username').unique().notNullable()
        tbl.text('password').notNullable()
        tbl.boolean('loggedIn').defaultTo(true)
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
};
