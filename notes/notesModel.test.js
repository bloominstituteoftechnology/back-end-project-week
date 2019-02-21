const notes = require('./notesModel');
const db = require('../data/dbConfig');

describe('the notes model', () => {

  afterEach(async () => {
    await db('notes').truncate();
  })

  it('should insert a new note', async () => {
    const ids = await notes.insert({ title: 'fake', textBody: 'note' });

    expect(ids.length).toBe(1);
    expect(ids[0]).toBe(1);
    
  })

  it('should send correct response object when getting notes', async () => {
    const array = await notes.getAll();
    
    expect(array).toEqual([]);
  })
})