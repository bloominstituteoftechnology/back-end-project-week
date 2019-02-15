exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        { title: 'Dj Khaled Ipsum', textBody: 'Lorem Khaled Ipsum is a major key to success. ' },
        { title: 'Dj Khaled Ipsum 44', textBody: 'Always remember in the jungle there’s a lot of they in there, '  },
        { title: 'Dj Khaled Ipsum 3', textBody: 'Egg whites, turkey sausage, wheat toast, water. '  },
      ]);
    });
};
