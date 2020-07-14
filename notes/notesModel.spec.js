const db = require('../data/dbConfig.js');
const notes = require('./notesModel');

beforeEach(async () => {
  await db('notes').truncate();
});

describe('notes model', () => {
  it('should insert provided note', async () => {
    // make sure the the test record is not in the db
    let rows = await db('notes').where({ title: 'Dog Chores', textBody: '- Walk the dogs' });
    expect(rows).toHaveLength(0);

    // insert a test record
    await notes.insert({ title: 'Dog Chores', textBody: '- Walk the dogs' });
    await notes.insert({ title: 'House Chores', textBody: '- Take out the trash' });

    // make sure the test record is now in the db
    rows = await db('notes').where({ title: 'Dog Chores', textBody: '- Walk the dogs' });
    expect(rows).toHaveLength(1);

    rows = await db('notes');
    expect(rows).toHaveLength(2);
  });

  it('should insert provided note', async () => {
    // make sure the the test record is not in the db
    let rows = await db('notes').where({ title: 'Dog Chores', textBody: '- Walk the dogs' });
    expect(rows).toHaveLength(0);

    // insert a test record
    await notes.insert({ title: 'Dog Chores', textBody: '- Walk the dogs' });
    await notes.insert({ title: 'House Chores', textBody: '- Take out the trash' });

    // make sure the test record is now in the db
    rows = await db('notes').where({ title: 'Dog Chores', textBody: '- Walk the dogs' });
    expect(rows).toHaveLength(1);

    rows = await db('notes');
    expect(rows).toHaveLength(2);
  });
  // it('should update a record', () => {
  // insert a record
  // update the record by id = 1
  // check that the record was updated with the new information
  // });
});

const proxyurl = 'https://cors-anywhere.herokuapp.com/';
const url = 'https://example.com'; // site that doesn’t send Access-Control-*
fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
  .then(response => response.text())
  .then(contents => console.log(contents))
  .catch(() => console.log('Can’t access ' + url + ' response. Blocked by browser?'));
