
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'Grocery List', body: 'bananas, coffee, broccoli, salmon, asparagus, soy milk'},
        {title: 'To Do', body: 'laundry, empty dishwasher, clean the kitchen'},
        {title: 'Christmas Shopping', body: 'buy gifts for mom and dad'}
      ]);
    });
};
