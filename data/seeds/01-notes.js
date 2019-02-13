exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        { title: 'Dj Khaled Ipsum', textBody: 'Lorem Khaled Ipsum is a major key to success. Surround yourself with angels, positive energy, beautiful people, beautiful souls, clean heart, angel. To succeed you must believe. When you believe, you will succeed. Bless up. The first of the month is coming, we have to get money, we have no choice. It cost money to eat and they don’t want you to eat. They never said winning was easy. Some people can’t handle success, I can. You see the hedges, how I got it shaped up? It’s important to shape up your hedges, it’s like getting a haircut, stay fresh.' },
        { title: 'Dj Khaled Ipsum 2', textBody: 'Always remember in the jungle there’s a lot of they in there, after you overcome they, you will make it to paradise. You should never complain, complaining is a weak emotion, you got life, we breathing, we blessed. Find peace, life is like a water fall, you’ve gotta flow. They never said winning was easy. Some people can’t handle success, I can. You see that bamboo behind me though, you see that bamboo? Ain’t nothin’ like bamboo. Bless up.'  },
        { title: 'Dj Khaled Ipsum 3', textBody: 'Egg whites, turkey sausage, wheat toast, water. Of course they don’t want us to eat our breakfast, so we are going to enjoy our breakfast. The key to success is to keep your head above the water, never give up. Lion! We don’t see them, we will never see them. How’s business? Boomin. You see the hedges, how I got it shaped up? It’s important to shape up your hedges, it’s like getting a haircut, stay fresh.'  },
      ]);
    });
};
