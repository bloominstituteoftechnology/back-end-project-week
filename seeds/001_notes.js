
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes')
  .del()
  .then(function () {
      // Inserts seed entries
      return knex('notes')
      .insert([
        
        {title: 'Paint the House',
         textBody: 'testing'},

      ]);
    });
};
