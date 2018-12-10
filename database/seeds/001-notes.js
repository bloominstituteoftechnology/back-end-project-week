
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        { title: 'First Note', textBody: 'This is the first of many notes to come' },
        { title: 'porta lorem mollis', textBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices eros in cursus turpis massa tincidunt dui ut ornare. Proin gravida hendrerit lectus a.' },
        { title: 'lobortis mattis aliquam', textBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
      ]);
    });
};
