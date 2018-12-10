const db = require('../data/dbConfig.js');
const notes = require('./notesModel');

beforeEach(async () => {
  await db('notes').truncate();
});

describe('notes model', () => {
  it('should insert provided note', async () => {
    // make sure the the test record is not in the db
    let rows = await db('notes').where({ title: 'Dog Chores', Content: '- Walk the dogs' });
    expect(rows).toHaveLength(0);

    // insert a test record
    await notes.insert({ title: 'Dog Chores', Content: '- Walk the dogs' });
    await notes.insert({ title: 'House Chores', Content: '- Take out the trash' });

    // make sure the test record is now in the db
    rows = await db('notes').where({ title: 'Dog Chores', Content: '- Walk the dogs' });
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
