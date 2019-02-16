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

describe('the notes Model', () => {

    describe('testing get functionality', () => {
        it('Should get all notes', async () => {
            const notesList = await notesModel.get()
            expect(notesList.length).toBe(3)
        });

        it('Should fetch and individual game by ID', async () => {
            const grabNote = await notesModel.get(1)
            expect(grabNote.title).toBe('note1')
        });

        it('Should return an empty array when empty', async () => {
            const deleteGame1 = await notesModel.remove(1)
            const deleteGame2 = await notesModel.remove(2)
            const deleteGame3 = await notesModel.remove(3)
            const notesList = await notesModel.get()
            expect(notesList).toEqual([])
        })
    });

    describe('testing insert functionality', () => {
        it('should insert a new note', async () => {
            const note4 = await notesModel.insert({
                title: 'Note 47',
                content: 'Inserted Note'
            });
            const grabNote4 = await notesModel.get(4)
            expect (grabNote4.title).toBe('Note 47')
        });

        it('should not insert a new note when missing title', async () => {
            const badNote = await notesModel.insert({
                title:'Bad Note'
            })
            expect(badNote).toBe('Please enter a note with a proper title and content.')
        })

        it('should not insert a new note when missing content', async () => {
            const badNote = await notesModel.insert({
                content:'Bad Note'
            })
            expect(badNote).toBe('Please enter a note with a proper title and content.')
        })
    })

    describe('testing update', () => {
        it('should update a current note', async () => {
            let grabNote3 = await notesModel.get(3)
            grabNote3.title = 'Updated Note'
            const UpdatedNote3 = await notesModel.update(3, grabNote3)
            let newNote3 = await notesModel.get(3)
            expect (newNote3.title).toBe('Updated Note')
        })

        it('should update the title of a note', async () => {
            let grabNote1 = await notesModel.get(1)
            grabNote1.title = 'Updated Note 1'
            const UpdatedNote1 = await notesModel.update(1, grabNote1)
            const note1 = await notesModel.get(1)
            expect( note1.title ).toBe('Updated Note 1')
        })

        it('should update the content of a note', async () => {
            let grabNote2 = await notesModel.get(2)
            grabNote2.content = 'Updated Content 2'
            const UpdatedNote2 = await notesModel.update(2, grabNote2)
            const note2 = await notesModel.get(2)
            expect( note2.content ).toBe('Updated Content 2')
        })
    })

    describe('testing remove', () => {
        it('should remove an unwanted note', async () => {
            const deleteGame = await notesModel.remove(1)
            expect(deleteGame).toBe(1)
        });

        it('Removing a note should decrease the amount of note by 1', async () => {
            const deleteGame = await notesModel.remove(1)
            const notesList = await notesModel.get()
            expect(notesList.length).toBe(2)
        });

        it('Should not remove a note when the user inputs an improper id', async () => {
            const badDelete = await notesModel.remove(77)
            expect(badDelete).toBe(0)
        });
    });
});