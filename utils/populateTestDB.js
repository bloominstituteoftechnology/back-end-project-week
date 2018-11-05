const bcrypt = require('bcrypt');
const notesSeedArray = require('../dummyData/noteSeedArray');
const notesTagsJoinArray = require('../dummyData/notesTagsJoinArray');
const tagSeedArray = require('../dummyData/tagSeedArray');

const usersSeedArray = [
  { username: 'user1', password: '1234' },
  { username: 'user2', password: '5678' },
];

const tables = [
  ['users', usersSeedArray],
  ['notes', notesSeedArray],
  ['tags', tagSeedArray],
  ['notesTagsJoin', notesTagsJoinArray],
];

const populateTestDB = (db) => {
  return tables
    .reduce((promises, [name, seed]) => {
      const insertArr = name !== 'users'
        ? seed
        : seed.map(user => ({ ...user, password: bcrypt.hashSync(user.password, 6) }));
      return promises.then(all => db(name)
        .insert(insertArr)
        .returning('*')
        .then(result => [...all, result]));
    }, Promise.resolve([]))
    .then((result) => {
      const [users, ...rest] = result;
      return users.map((user, index) => ({ ...user, password: usersSeedArray[index].password }));
    });
};

module.exports = populateTestDB;
