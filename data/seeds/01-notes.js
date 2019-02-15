exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        { title: 'Dj Khaled Ipsum', textBody: 'Lorem Khaled Ipsum is a major key to success. Surround yourself with angels, positive energy, beautiful people, beautiful souls, clean heart, angel. To succeed you must believe. When you believe, you will succeed. Bless up. ' },
        { title: 'Dj Khaled Ipsum 44', textBody: 'Always remember in the jungle there’s a lot of they in there, after you overcome they, you will make it to paradise. You should never complain, complaining is a weak emotion, you got life, we breathing, we blessed.'  },
        { title: 'Dj Khaled Ipsum 3', textBody: 'Egg whites, turkey sausage, wheat toast, water. Of course they don’t want us to eat our breakfast, so we are going to enjoy our breakfast. The key to success is to keep your head above the water, never give up.'  },
      ]);
    });
};
