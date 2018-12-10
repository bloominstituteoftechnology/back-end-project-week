
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'Project week', textBody:'Here we go again'},
        {title: 'Finish back end', textBody:'That can happen today'}
      ]);
    });
};
