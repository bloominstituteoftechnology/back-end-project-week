
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('NoteTable').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('NoteTable').insert([
        {title: 'Note Title',textBody: 'Note Body'},
        {title: 'Note Title1',textBody: 'Note Body1'},
        {title: 'Note Title2',textBody: 'Note Body2'},
        {title: 'Note Title3',textBody: 'Note Body3'},
        {title: 'Note Title4',textBody: 'Note Body4'}
        
      ]);
    });
};
