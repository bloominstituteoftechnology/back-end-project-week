exports.seed = function(knex, Promise) {
  return knex('users').insert([
    { id: 1, username: 'Banksy', hash: 'anythingIwant1' },
    { id: 2, username: 'Kimura', hash: 'anythingIwant2' },
    { id: 3, username: 'Brooklyn', hash: 'anythingIwant3' }
  ]);
};
