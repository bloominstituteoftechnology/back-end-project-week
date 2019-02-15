
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        {tagTitle: 'finances', notes_id: 1},
        {tagTitle: 'work', notes_id: 1},
        {tagTitle: 'family', notes_id: 2},
        {tagTitle: 'family', notes_id: 3},
        {tagTitle: 'hobbies', notes_id: 3}
      ]);
    });
};
