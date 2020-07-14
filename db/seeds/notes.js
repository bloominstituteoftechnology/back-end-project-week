
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {_id: 0, title: 'bank', textBody: 'I need cash and quarters for laundry.'},
        {_id: 1, title: 'laundry', textBody: 'Do it late at night when no one else is trying to use the machines.'},
        {_id: 2, title: 'haircut', textBody: 'The Supercuts on Sunset & Gower.  Call first.'},
        {_id: 3, title: 'cable bill', textBody: 'Pay online by Thursday.'},
        {_id: 4, title: 'dinner', textBody: "Dinner at my sister's house in Redondo Beach at 7pm."},
      ]);
    });
};
