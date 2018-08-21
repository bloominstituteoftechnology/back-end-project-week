const noteSeedArray = require('../dummyData/noteSeedArray');
const tagSeedArray = require('../dummyData/tagSeedArray');
const notesTagsMapArray = require('../dummyData/notesTagsJoinArray');

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('notes')
    .del()
    .then(() => knex('notes').insert(noteSeedArray))
    .then(() => knex('tags').del())
    .then(() => knex('tags').insert(tagSeedArray))
    .then(() => knex('notesTagsJoin').del())
    .then(() => knex('notesTagsJoin').insert(notesTagsMapArray));
};
