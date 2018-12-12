exports.seed = function(knex) {
  return knex('notes').insert([
    {title: 'first', content: 'hey'},
    {title: 'second', content: 'sup'},
    {title: 'third', content: 'yo'},
  ]);
};