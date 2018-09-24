
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title:'Dr. Strange', textBody:'Keeper of the Time Stone'},
        {title:'Thor', textBody: 'God of Thunder'},
        {title:'Captain America', textBody:'The First Avenger'}
      ]);
    });
};