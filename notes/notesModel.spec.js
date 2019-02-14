const notes = require('./notesModel.js');
const db = require('../data/dbConfig.js');

afterEach(async () => {
    await db('notes').truncate();
});
describe('the notes Model', () => {

    it('Should get all notes', async () => {
        const notesList = await notes.get()
        expect(notesList).toEqual([])
    });

    it('Should fetch and individual game by ID', async () => {
        const grabNote = await notes.get(1)
        expect(grabNote.title).toBe('note1')
    });

})