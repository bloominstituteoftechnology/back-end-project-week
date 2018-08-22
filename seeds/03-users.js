
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Alec', password:'$2a$14$yZm8QsrPfa3bY5t4K0DiGeNMBwnGIbTfAQHdNrUjFBZXbVwdNEVk.'}, //passphrase
        {id: 2, username: 'Mike', password:'$2a$14$wCufZz97TrLj7GzsvEfdmuhqr/HgkOIQh77lONYfIRY9FXuhhD24e'}, //passphrase
        {id: 3, username: 'Ana', password:'$2a$14$a8mnWqyzYggTYjMbTkEPGuXt/07C8.0KPxqM86b4KCGxRY4Cqf.G2'} //cutie
      ]);
    });
};
