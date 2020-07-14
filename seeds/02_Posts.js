
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {id: 1, userId: 1, text:'1_1 _ Lorem ipsum dolor sit amet, mea eros virtute '},
        {id: 2, userId: 1, text:'2_1 _ No suas nihil inermis vim, nam reformidans comprehensam ne. '},
        {id: 3, userId: 1,text: '3_1 _ Mei ut paulo pertinacia, cum percipit vulputate ne. Pro dicta '},
        {id: 4, userId: 2, text:'1_2 _ Lorem ipsum dolor sit amet, mea eros '},
        {id: 5, userId: 2, text:'2_2 _ No suas nihil inermis vim, nam reformidans '},
        {id: 6, userId: 2,text: '3_2 _ Mei ut paulo pertinacia, cum percipit vulputate ne. Pro '},
        {id: 7, userId: 3, text:'1_3 _ Lorem ipsum dolor sit amet, mea eros virtute interpretaris '},
        {id: 8, userId: 3, text:'2_3 _ No suas nihil inermis vim, nam '},
        {id: 9, userId: 3,text: '3_3 _ Mei ut paulo pertinacia, cum percipit vulputate ne.'}
      ]);
    });
};
