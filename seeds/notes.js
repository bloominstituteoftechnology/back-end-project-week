
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: 'cat', content:'meow'},
        {id: 2, title: 'dog',content:'woof'},
        {id: 3, title: 'bird',content:'chirp'}
      ]);
    });
};
