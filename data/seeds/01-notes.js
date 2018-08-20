
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {title: 'Trello Set Up', content: 'Bacon ipsum dolor amet strip steak tail pancetta corned beef, pork pastrami short loin fatback. Beef flank shoulder chuck porchetta swine sirloin prosciutto burgdoggen jerky spare ribs. Sirloin rump andouille, shankle shank tri-tip ham hock chuck cow swine frankfurter ribeye kielbasa t-bone. Sausage spare ribs salami pork tri-tip. Ribeye beef short loin biltong turkey salami prosciutto, bresaola pork belly rump venison fatback.'},
        {title: 'MVP Features', content: 'Ground round ribeye t-bone, pork loin pork belly turkey beef venison turducken short ribs sausage picanha prosciutto. Doner pastrami jowl landjaeger. Venison shank chuck, strip steak picanha t-bone burgdoggen porchetta jerky tenderloin meatloaf capicola. Brisket kevin meatloaf ham, buffalo rump strip steak salami porchetta pastrami burgdoggen corned beef chuck hamburger. Flank bacon pastrami pork chop jerky shankle venison.'},
        {title: 'Extra Features', content: 'Ribeye meatball tenderloin chicken sausage pig beef frankfurter bacon shank. Turducken swine buffalo, kielbasa jerky salami drumstick prosciutto hamburger filet mignon cow fatback boudin short loin. Turkey drumstick venison frankfurter, short ribs corned beef leberkas boudin meatloaf ribeye pork chop hamburger capicola pork loin jerky. Short loin swine frankfurter picanha spare ribs turkey prosciutto chuck ball tip ground round boudin shoulder meatloaf rump. Ball tip meatball pig pork bacon. Leberkas landjaeger buffalo salami, meatloaf shoulder beef turkey flank pig alcatra cow swine. Biltong buffalo frankfurter, pork loin short ribs capicola alcatra picanha boudin turkey.'},
        {title: 'Super Duper Extra Credit Bonus Features', content: 'Ball tip landjaeger leberkas, pastrami kevin tenderloin pancetta t-bone bacon spare ribs boudin jerky tail shoulder. Buffalo meatloaf tail andouille chuck turkey pastrami picanha boudin sirloin frankfurter ribeye capicola bacon. Pork loin prosciutto flank bacon turkey short loin shoulder frankfurter drumstick ham sirloin pig chicken biltong. Capicola burgdoggen turkey sirloin cow chicken venison shankle tail jerky. Picanha strip steak leberkas, chicken sausage tongue hamburger shank pork loin capicola buffalo drumstick swine tenderloin ham hock.'}
      ]);
    });
};
