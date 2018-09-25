exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
      .then(function () {
      // Inserts seed entries
          return knex('notes').insert([
              {id: 1, title: 'test1', content: 'stuff'},
              {id: 2, title: 'test3', content: 'more stuff'},
              {id: 3, title: 'test4', content: 'even more stuff'},
              {id: 4, title: 'test5', content: 'stop all the stuff'}
      ]);
  });
};

