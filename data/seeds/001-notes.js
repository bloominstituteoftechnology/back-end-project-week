
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'rowValue1', textBody: 'Some description here of the note you would like to create.', tags: '#Symbiotic #Creation'},
        {title: 'rowValue2', textBody: 'I must walk the dog today as to get adequate exercise.', tags: '#Serotonin #Dopamine'},
        {title: 'rowValue3', textBody: 'Text her after project is finished', tags: "#Cyber #Messages"}
      ]);
    });
};
