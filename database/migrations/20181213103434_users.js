
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users',users => {
        users.increments();
        users.string('username',64).notNullable();
        users.string('password',128).notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
