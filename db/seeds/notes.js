
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('notes').insert([
        {
          title: 'Joe Dirt',
          content:
            `Joe Dirt: So you're gonna tell me that you dont have no Black Cats, no Roman Candles, no Screaming Meemies? 

            Kickin' Wing: No. 
            
            Joe Dirt: Oh come on man, you don't got no Ladyfingers, Buzz Bottles, Snicker Bombs, Church Burners, Finger Blasters, Gut Busters, Zippedy-doodas, Crap Flappers? 
            
            Kickin' Wing: No, I don't. 
            
            Joe Dirt: You're gonna stand there, owning a fireworks stand and tell me you dont have any Whistling Bungholes, no Spleen Splitters, Whisker Biscuits, Honkey Lighters, Hüsker Düs, Hüsker Don'ts, Cherry Bombs, Nipsy Dazers, with or without the Scooter Stick, or one single Whistling Kitty-chaser? 
            
            Kickin' Wing: No. 
            
            Joe Dirt: Why? 
            
            Kickin' Wing: Because Snakes and Sparklers are the only ones I like.`,
        },
        {
          title: 'Gucci Mane',
          content:
            `Don't get lost in the sauce`,
        },
        {
          title: 'Drake',
          content:
            'KiKi do you love me?',
        },
        {
          title: 'Jason Derulo',
          content:
            'JASOOOON DERULLLOOOOOOO',
        },
      ]);
    });
};
