const lorem = 'consectetur quis elit culpa do ad irure amet sint magna magna cupidatat ut in nostrud aliquip aute officia quis sit cupidatat'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'note1', content: lorem},
        {title: 'note2', content: lorem},
        {title: 'note3', content: lorem}
      ]);
    });
};

