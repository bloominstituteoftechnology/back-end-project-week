
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: 'Lambda-Notes', content:'Creating a backend server to our front end lambda apps'},
        {id: 2, title: 'Computer Science', content:'After this week, we get three weeks off and then we will start our CS portion of lambda'},
      ]);
    });
};
