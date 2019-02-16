const notesModel = require('./notesModel.js');
const db = require('../data/dbConfig.js');

beforeEach( () => {
    return db.migrate.rollback()
    .then( () => {
        return db.migrate.latest()
        .then( () => {
            return db.seed.run()
        })
    })
});

afterEach(async () => {
    await db('notes').truncate();
});

describe('the notes Model', () => {

    it('Should get all notes', async () => {
        const notesList = await notesModel.get()
        console.log(notesList);
        expect(notesList.length).toBe(3)
    });

    it('Should fetch and individual game by ID', async () => {
        const grabNote = await notesModel.get(1)
        console.log('grabNote', grabNote)
        expect(grabNote.title).toBe('note1')
    });

})
