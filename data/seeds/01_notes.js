
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title:'Dr. Strange', textBody:'Keeper of the Time Stone',tags:'human, sorceror'},
        {title:'Thor', textBody: 'God of Thunder', tags:'Asgardian, god'},
        {title:'Captain America', textBody:'The First Avenger',tags:'human, captain'}
      ]);
    });
};