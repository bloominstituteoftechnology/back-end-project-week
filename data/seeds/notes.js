
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, user_id: 1, title: 'History Class Notes', body: 'Quisque aliquam et dui in porta. Phasellus tempor eu nisi in pharetra. Maecenas semper massa ut nisi commodo rhoncus. Etiam eget eleifend mauris, pellentesque ornare dui. Morbi tincidunt molestie molestie.'},
        {id: 2, user_id: 1, title: 'Science Class Notes', body: 'Quisque aliquam et dui in porta. Phasellus tempor eu nisi in pharetra. Maecenas semper massa ut nisi commodo rhoncus. Etiam eget eleifend mauris, pellentesque ornare dui. Morbi tincidunt molestie molestie.'},
        {id: 3, user_id: 1, title: 'Math Class Notes', body: 'Quisque aliquam et dui in porta. Phasellus tempor eu nisi in pharetra. Maecenas semper massa ut nisi commodo rhoncus. Etiam eget eleifend mauris, pellentesque ornare dui. Morbi tincidunt molestie molestie.'},
      ]);
    });
};
