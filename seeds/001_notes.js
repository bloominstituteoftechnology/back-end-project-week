exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('notes').insert([
        { title: 'macaroons', textBody: 'vanilla, rose, red velvet 🍪' },
        { title: 'ice cream 🍨', textBody: 'strawberry 🍓' },
        { title: 'flan', textBody: 'caramel 🍮' }
      ]);
    });
};
