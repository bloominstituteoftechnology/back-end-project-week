
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', t => {
        t.increments();
        t.string('title')
        t.string('content')
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('notes')
};
