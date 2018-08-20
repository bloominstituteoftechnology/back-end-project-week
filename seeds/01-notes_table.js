
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: 'Robin Hood', content: 'He was a swell lad, doing good for the people.'},
        {id: 2, title: 'Wolvknexerine', content: 'I lost out on Jean Grey, oh well'},
        {id: 3, title: 'Mickey Mouse', content: 'Hey Disney! Am I still the mascot?'}
      ]);
    });
};
