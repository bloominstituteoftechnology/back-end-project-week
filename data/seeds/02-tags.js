
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        {tag: 'Marlon Brando'}, // 1
        {tag: 'Al Pacino'}, // 2
        {tag: 'Robert Duvall'}, // 3
        {tag: 'Mark Hamill'}, // 4
        {tag: 'Harrison Ford'}, // 5
        {tag: 'Carrie Fisher'}, // 6
        {tag: 'Elijah Wood'}, // 7
        {tag: 'Ian McKellen'}, // 8
        {tag: 'Orlando Bloom'}, // 9
        {tag: 'Arnold Schwarzenegger'}, // 10
        {tag: 'Edward Furlong'}, // 11
        {tag: 'Linda Hamilton'}, // 12
        {tag: 'Jim Carrey'}, // 13
        {tag: 'Jeff Daniels'}, // 14
        {tag: 'Lauren Holly'}, // 15
        {tag: 'Kurt Russell'}, // 16
        {tag: 'Bill Paxton'}, // 17
        {tag: 'Sam Elliot'} // 18
      ]);
    });
};
