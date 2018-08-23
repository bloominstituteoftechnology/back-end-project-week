exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, username: 'Thomas', password: 'Thomas' },
        { id: 2, username: 'Penny', password: 'Penny' },
      ]);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
