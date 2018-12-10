
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: 'Call Vet', content: 'Freckles needs a trip to the vet'},
        {id: 2, title: 'Call Bank', content: 'Send dad some money'},
        {id: 3, title: 'Don\'t go CRAZY', content: 'Don\'t go kill doctors at the VA'}
      ]);
    });
};
