
exports.seed = function (knex) {
  // Deletes ALL existing entries
      return knex('notes').insert([
        { title: 'First Note', textBody: 'This is the first of many notes to come', tags: '#firstnote', users_id: 1 },
        { title: 'porta lorem mollis', textBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices eros in cursus turpis massa tincidunt dui ut ornare. Proin gravida hendrerit lectus a.', tags: '#secondnote', users_id: 1 },
        { title: 'lobortis mattis aliquam', textBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tags: '#thirdnote', users_id: 1 },
      ]);
};
