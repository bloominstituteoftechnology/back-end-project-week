
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_table').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users_table').insert([
        {username: 'leelenf', colName: '123'},        
      ]);
    });
};
