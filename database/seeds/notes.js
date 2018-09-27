exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("notes")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("notes").insert([
        { id: 1, title: 'greatest note.', textBody: 'such a great note.' },
        { id: 2, title: 'note number two', textBody: 'what is this mean.' },
        { id: 3, title: 'whats going on', textBody: 'notes can be nice.' }
      ]);
    });
};