exports.seed = function(knex, Promise) {
  return knex('notes').truncate()
    .then(function () {
      return knex('notes').insert([
        {title:'Test 1', textBody: 'Get W2?!'},
        {title:'Test 2', textBody: 'File taxes!'},
        {title:'Test 3', textBody: 'Tax-mas!!!!'}
      ]);
    });
};
