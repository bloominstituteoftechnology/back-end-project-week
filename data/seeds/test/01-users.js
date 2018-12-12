exports.seed = function(knex, Promise) {
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'ryan_walker',
          password: 'pass',
          email: 'rwalker@gmail.com'
        },
        {
          username: 'lilhandsharrison',
          password: 'pass',
          email: 'lilhands@gmail.com'
        },
        { username: 'danny_b', password: 'pass', email: 'dannyb@gmail.com' }
      ]);
    });
};
