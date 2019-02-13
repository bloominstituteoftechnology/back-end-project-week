
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'Hello Friends', textBody: `If you're reading this... I love you!`},
        {title: 'Add more body to the music', textBody: `Holy moly, measure 34 could really use some fattening up. Get to it!`},
        {title: 'Lambda billionare strikes again', textBody: `Wow, another truly breathtaking story of the rise of nobody to somebody under Capatilism.`},
        {title: 'Yet another unique title', textBody: `It's getting tiring writing these... better not to put too much thought into it. It's only seed data! Make what's necessary and move on. Take care to not burnout. As always, take care of yourself first and foremost. If you're feeling kind of sticky and cloudy, it's normal. :)`},
        {title: 'Phew that Voidz show was amaze-balls', textBody: `Amazin! They brought out Air for the encore! In the middle of a twenty-eight minute remix of their hit single Cherry Blossom Girl, Thomas Mars (of Phoenix) was featured as a guest vocalist. Some people fainted. Some ascended into another plane of existence and have yet to return. This has been a report from the Indoor-Inside.`},
        {title: 'Testing 123', textBody: `Hey it's another test note here`},
        {title: 'Is this work??', textBody: `Why doesn't this show up correctly?`},
        {title: 'Formatting all messed up', textBody: `Wow what's going on?`},
        {title: 'Stop Polluting Notes!', textBody: `Please please PLEASE take care to post only appropriate content. This is a shared database. Pick your words wisely as it reflects on your character and fellow digital student body.`},
        {title: 'Make Notes Great Again!', textBody: `WHO NEEDS censorship?! Aren't you SICK of the NOTES SWAMP too?! We need to keep NOTES tidy and EXCLUSIVE. No more silly test note messages or nonsense. Make NOTES DB FREE AGAIN!!`},
        {title: `Okay that's enough`, textBody: `If you're reading this... I genuinely put effort into writing some of these. It's fun!`},
        {title: 'Hola', textBody: `If you're reading this... te quiero mucho! Quedate un rato.`},
        {title: 'From me to the Universe', textBody: `If you're reading this... I love you!`},
        {title: 'Pls Respond', textBody: `I miss it when we used to talk every night. Remember how we had the energy to stay up making up topics to talk about. Just you and me from 12 to dawn. It felt cute, young, and pink. Maybe romance is that way.`},
        {title: 'What color are you today?', textBody: `I'm black... per usual.`},
        {title: 'Starting to see a theme here', textBody: `The Clash`},
        {title: 'What a great transition', textBody: `Listen to the way the music breaks and then re-convenes, what a masterful transition.`},
        {title: 'Long Distance Call', textBody: `EP Phone Home!`},
      ]);
    });
};
