exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('notes').insert([
        { title: 'macaroons', text: 'vanilla, rose, red velvet' },
        { title: 'ice cream', text: 'strawberry' },
        { title: 'flan', text: 'caramel' }
      ]);
    });
};
