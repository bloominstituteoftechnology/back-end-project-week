
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {title:'Dr. Strange', textBody:'Keeper of the Time Stone'},
        {title:'Thor', textBody: 'God of Thunder'},
        {title:'Captain America', textBody:'The First Avenger'}
      ]);
    });
};


