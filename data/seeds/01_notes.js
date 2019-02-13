
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title : 'Physics', content: 'I would like to learn physics and there are more things to lean' },
        {id: 2, title:'Mathematics', content:'Algebra 1 deals with many more things in life'},
        {id: 3, title:'Probability and statistics', content:'I need to learn more math here'},
      ]);
    });
};
