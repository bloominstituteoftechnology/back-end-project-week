
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {
          id: 2, 
          title: '2-title',
          content: 'CONTENT PLACEHOLDER: Aliqua esse non enim id do irure laboris aliqua magna sit. Non ipsum laboris aute cupidatat commodo labore non ullamco magna veniam. Consectetur sunt nostrud non elit sunt. Exercitation aliquip sint culpa amet eu magna reprehenderit cillum aliquip ipsum Lorem excepteur Lorem quis. Veniam mollit consequat do Lorem pariatur enim ipsum in eiusmod.'
        },
        {
          id: 3, 
          title: '3-title',
          content: 'CONTENT PLACEHOLDER: Incididunt dolore adipisicing officia deserunt Lorem veniam esse laboris deserunt. Dolore esse proident laborum officia. Duis anim incididunt ea qui in do reprehenderit aute.'
        },
        {
          id: 4, 
          title: '4-title',
          content: 'CONTENT PLACEHOLDER: Aliqua irure proident officia eu id velit consectetur elit labore proident ipsum. Sunt aliqua amet consectetur incididunt commodo dolor aliquip cupidatat laborum quis. Culpa excepteur fugiat qui sint consectetur elit minim qui irure minim ea.'
        },
        {
          id: 5, 
          title: '5-title',
          content: 'CONTENT PLACEHOLDER: Elit deserunt minim irure proident. Adipisicing aliqua exercitation labore cupidatat do tempor elit dolor amet est. Sunt ut aliquip ullamco commodo. Sint elit tempor Lorem excepteur dolore culpa irure nisi minim. Cillum consequat sint laboris excepteur laborum deserunt nisi exercitation dolor occaecat consectetur sunt. Mollit excepteur enim ullamco velit dolor irure proident minim id nulla. Pariatur nostrud deserunt adipisicing est mollit Lorem ullamco.'
        },
        {
          id: 6, 
          title: '6-title',
          content: 'CONTENT PLACEHOLDER: Consequat sunt deserunt irure ea ex nulla eiusmod labore sint ipsum. Consectetur laborum irure mollit ullamco commodo nisi ea dolor laboris. Exercitation ut ea laborum qui in minim ullamco aute et do velit enim cupidatat occaecat. Aute ullamco ipsum aute exercitation sunt occaecat laboris est reprehenderit quis sit esse minim veniam. Commodo voluptate ullamco ad consequat eu est pariatur aliqua magna eu. Magna magna culpa laborum amet. Dolore duis quis amet aliqua mollit laboris reprehenderit tempor.'
        },
        {
          id: 7, 
          title: '7-title',
          content: 'CONTENT PLACEHOLDER: Est deserunt proident excepteur proident esse nulla velit. Aute culpa Lorem labore eu mollit culpa duis pariatur. Veniam voluptate occaecat minim dolor esse tempor occaecat occaecat est nulla. Aute sint culpa eiusmod ut anim non velit sit cillum enim ea. Ex cupidatat tempor enim ut enim ad qui aliqua aliquip deserunt sit.'
        },
        {
          id: 8, 
          title: '8-title',
          content: 'CONTENT PLACEHOLDER: Minim nulla amet tempor incididunt non fugiat est. Est sint ut aliquip mollit sint consequat nostrud culpa reprehenderit eu veniam ut aliquip. Ea culpa eu nostrud ipsum excepteur consectetur ex cupidatat in occaecat. Minim reprehenderit consequat id duis veniam tempor nulla nostrud id duis do.'
        },
        {
          id: 9, 
          title: '9-title',
          content: 'CONTENT PLACEHOLDER: Occaecat cillum occaecat veniam anim eu eu amet tempor. Ea culpa qui voluptate est consequat nostrud magna aute proident ex enim deserunt. Pariatur reprehenderit in aute sint id aute officia dolor adipisicing aute nulla sunt ad qui. Duis laborum enim nulla ad veniam laborum enim eu fugiat magna mollit elit. Aute adipisicing nostrud quis eiusmod tempor eiusmod. Ut est magna incididunt non.'
        },
        
      ]);
    });
};
