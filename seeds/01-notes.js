

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
      .then(function () {
      // Inserts seed entries
          return knex('notes').insert([
              {id: 1, title: 'ToDo', content: 'work, work, work'},
              {id: 2, title: 'ToEat', content: 'all the foods'},
              {id: 3, title: 'Goals', content: 'work smart'},
              {id: 4, title: 'Events', content: 'network'}
      ]);
  });
};