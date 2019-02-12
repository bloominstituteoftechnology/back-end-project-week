
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'Test Note #1', textBody: 'This is my note that I love so dear'},
        {title: 'Test Note #2', textBody: 'It is that which I hold so near'},
        {title: 'Test Note #3', textBody: 'When I do think that it is not here'},
        {title: 'Test Note #4', textBody: 'I go to the other note in rear'},
        {title: 'Test Note #5', textBody: 'But when all I see back there is deer'},
        {title: 'Test Note #6', textBody: 'It is my gladness that it does clear'},
      ]);
    });
};
