
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: 'Welcome', contents: "This is lambda!", author: "Lambda School"},
        {id: 2, title: 'what We Do', contents: "We teach students to code", author: "Lambda School"},
        {id: 3, title: 'Who We Are', contents: "Nerds! Well, most of us anyway", author: "Lambda School"},
      ]);
    });
};
