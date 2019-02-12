
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'David', email: 'david.kuenzar@gmail.com', password: 'David#123'},
        {id: 2, name: 'Bob', email: 'bobthebuilder@gmail.com', password: 'B0B'},
        {id: 3, name: 'Billy', email: 'billythebuilder@gmail.com', password: 'sonOfB0b'}
      ]);
    });
};
