
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: 'FlatBush Zombies', description: 'I love their rap', user_id: 1},
        {id: 2, title: 'Build a house', description: 'You play minecraft idk', user_id: 2},
        {id: 3, title: `I'm Billy`, description: 'Hyuck Billy is my name', user_id: 3}
      ]);
    });
};
