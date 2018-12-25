
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'Welcome to Bubble Notes', textBody:'A Ryan Clausen Creation'},
        {title: 'Front end:', textBody:'React 16.7.0-alpha.2. Global state Management with reactN.'},
        {title: 'Back end:', textBody:'Node/express server using knex with a sqlite3 database.'}
      ]);
    });
};
