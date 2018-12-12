
exports.seed = function(knex) {
    return knex('users').insert([
      {name: 'bob', email: 'bob@bob.com'},
      {name: 'alice', email: 'alice@bob.com'},
      {name: 'steve', email: 'steve@com.com'},
    ]);
};
