exports.seed = function(knex, Promise) {
  
  return knex('notes').truncate()
    .then(function () {
      
      return knex('notes').insert([
        {title: ' Note #1', textBody: 'make groceries'},
        {title: ' Note #2', textBody: 'dont park in the neutral ground'},
        {title: ' Note #3', textBody: 'dont look for a Lagniappe'},
        {title: ' Note #4', textBody: 'sharpen the Arkansas Toothpick'}
      ]);
    });
};
