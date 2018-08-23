
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'DirupT', password: '$2a$14$AeTR7LYM//vlj5ofsrYB2ub2faK5Wd4xv.dRvdk92yvfPgCBkfCVG', note_order: '[2, 3, 1, 4, 5, 6]' },
        { username: 'test', password: '$2a$14$AeTR7LYM//vlj5ofsrYB2ub2faK5Wd4xv.dRvdk92yvfPgCBkfCVG', note_order: '[7, 8, 10, 9, 12, 11]' },
        { username: 'test1', password: '$2a$14$AeTR7LYM//vlj5ofsrYB2ub2faK5Wd4xv.dRvdk92yvfPgCBkfCVG', note_order: '[16, 14, 15, 18, 17, 13]' },
      ]);
    });
};
