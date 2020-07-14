const lorem = 'consectetur quis elit culpa do ad irure amet sint magna magna cupidatat ut in nostrud aliquip aute officia quis sit cupidatat'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'knote', textBody: lorem},
        {title: 'snote', textBody: lorem},
        {title: 'wnote', textBody: lorem},
        {title: 'tnote', textBody: lorem},
        {title: 'unote', textBody: lorem},
        {title: 'onote', textBody: lorem},
        {title: 'rnote', textBody: lorem},
        {title: 'qnote', textBody: lorem},
        {title: 'jnote', textBody: lorem},
        {title: 'bnote', textBody: lorem},
        {title: 'mnote', textBody: lorem},
        {title: 'lnote', textBody: lorem},
        {title: 'pnote', textBody: lorem},
        {title: '0pnote', textBody: lorem},
        {title: '0note', textBody: lorem},
        {title: 'tjnote', textBody: lorem},
        {title: 'tnote', textBody: lorem},
        {title: 'rnote', textBody: lorem},
        {title: 'wnote', textBody: lorem},
        {title: '4note', textBody: lorem},
        {title: 'jnote', textBody: lorem},
        {title: 'knote', textBody: lorem},
        {title: 'llnote', textBody: lorem},
        {title: 'gnote', textBody: lorem},
        {title: 'grnote', textBody: lorem},
        {title: 'rnote', textBody: lorem},
        {title: 'rnote', textBody: lorem},
        {title: '6note', textBody: lorem},
        {title: '7note', textBody: lorem},
        {title: '8note', textBody: lorem},
        {title: 'rnote', textBody: lorem},
        {title: 'fnote', textBody: lorem},
        {title: 'rnote', textBody: lorem},
      ]);
    });
};

