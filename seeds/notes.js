const noteSeedArray = require('../dummyData/noteSeedArray');

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('notes')
    .del()
    .then(() => knex('notes').insert(noteSeedArray));
};
