
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'note111', content: 'content111'},
        {title: 'note222', content: 'content222'},
        {title: 'note333', content: 'content333'},
        {title: 'note444', content: 'content444'},
        {title: 'note555', content: 'content555'},
        {title: 'note666', content: 'content666'}
      ]);
    });
};
