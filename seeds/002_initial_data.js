
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        { title: 'Learn React', textBody: 'Learning React really well would be super neat'},
        { title: 'Learn Some kind of photo Editing software', textBody: 'The world needs more emojis (maybe?)'},
        { title: 'Just, live your life, man', textBody: 'I guess this is going to happen no matter what you do'}
      ]);
    });
};
