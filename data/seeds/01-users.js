exports.seed = function(knex, Promise) {
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'ryan_walker', password: 'pass' },
        { username: 'lilhandsharrison', password: 'pass' },
        { username: 'danny_b', password: 'pass' }
      ]);
    });
};
