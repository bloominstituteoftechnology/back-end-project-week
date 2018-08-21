
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'DirupT', password: '$2a$14$AeTR7LYM//vlj5ofsrYB2ub2faK5Wd4xv.dRvdk92yvfPgCBkfCVG' },
        { username: 'test', password: '$2a$14$AeTR7LYM//vlj5ofsrYB2ub2faK5Wd4xv.dRvdk92yvfPgCBkfCVG' },
        { username: 'test1', password: '$2a$14$AeTR7LYM//vlj5ofsrYB2ub2faK5Wd4xv.dRvdk92yvfPgCBkfCVG' },
      ]);
    });
};
