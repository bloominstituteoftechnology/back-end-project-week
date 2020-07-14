
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'Test Note #1', textBody: 'This is my note that I love so dear', user_id: 1},
        {title: 'Test Note #2', textBody: 'It is that which I hold so near', user_id: 1},
        {title: 'Test Note #3', textBody: 'When I do think that it is not here', user_id: 1},
        {title: 'Test Note #4', textBody: 'I go to the other note in rear', user_id: 1},
        {title: 'Test Note #5', textBody: 'But when all I see back there is deer', user_id: 1},
        {title: 'Test Note #6', textBody: 'It is my gladness that it does clear', user_id: 1},
      ]);
    });
};
