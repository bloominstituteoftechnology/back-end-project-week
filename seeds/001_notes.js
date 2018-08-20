
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title:'Build a bear', content:'Assemble a bear from parts'},
        {id: 2, title:'Make Dinner', content:'Make chick parm for family'},
        {id: 3, title:'Wash laundry', content:'laundry has been piling up'}
      ]);
    });
};
