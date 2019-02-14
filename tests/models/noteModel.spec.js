const noteModel = require('../../data/models/noteModel');
const db = require('../../data/dbConfig');

describe('The Note Model', () => {

    describe('Create Note', () => {

        beforeEach(() => {
            db('notes').truncate();
        });

        afterAll(() => {
            db('notes').truncate();
        });

        test("throws MissingParam when note object not present", () => {
            try {
                noteModel.create();
            } catch (e) {
                expect(e.name).toBe('MissingParam')
                expect(e.message).toBe('note object');
            }
        });

        test("throws TypeError when note is not object", () => {
            try {
                noteModel.create('Not object');
            } catch (e) {
                expect(e.name).toBe('TypeError')
                expect(e.message).toBe('note is not an object');
            }
        });

        test("throws MissingKey when 'title' key not present in note object", () => {
            try {
                noteModel.create({content: "Content"});
            } catch (e) {
                expect(e.name).toBe('MissingKey')
                expect(e.message).toBe('title');
            }
        });

        test("throws MissingKey when 'content' key not present in note object", () => {
            try {
                noteModel.create({title: "Title"});
            } catch (e) {
                expect(e.name).toBe('MissingKey')
                expect(e.message).toBe('content');
            }
        });

        test("throws TypeError when 'title' value is not string", () => {
            try {
                noteModel.create({title: 0, content: "Content"});
            } catch (e) {
                expect(e.name).toBe('TypeError')
                expect(e.message).toBe("'title' value must be string");
            }
        });

        test("throws TypeError when 'content' value is not string", () => {
            try {
                noteModel.create({title: "Title", content: 0});
            } catch (e) {
                expect(e.name).toBe('TypeError')
                expect(e.message).toBe("'content' value must be string");
            }
        });

        test('returns new note object with id', () => {
            const note = noteModel.create({title: 'Title', content: 'Content'});
            expect(note).toEqual({id: 1, title: 'Title', content: 'Content'});
        });

    });

    describe('Read All Notes', () => {

        beforeEach(() => {
            db('notes').truncate();
        });

        afterAll(() => {
            db('notes').truncate();
        });

        test('returns array of all notes', () => {
            noteModel.create({title: 'Title 1', content: 'Content 1'});
            noteModel.create({title: 'Title 2', content: 'Content 2'});
            noteModel.create({title: 'Title 3', content: 'Content 3'});

            const notes = noteModel.read();
            expect(notes).toEqual([
                {id: 1, title: 'Title 1', content: 'Content 1'},
                {id: 2, title: 'Title 2', content: 'Content 2'},
                {id: 3, title: 'Title 3', content: 'Content 3'}
            ]);
        });

        test('returns empty array', () => {
            const notes = noteModel.read();
            expect(notes).toEqual([]);
        });

    });

    describe('Read Note by ID', () => {

        beforeEach(() => {
            db('notes').truncate();
        });

        afterAll(() => {
            db('notes').truncate();
        });

        test('throws InvalidID on invalid id', () => {
            try {
                noteModel.read(1);
            } catch (e) {
                expect(e.name).toBe('InvalidID');
                expect(e.message).toBe('id does not exist');
            }
        });

        test('returns note object by id', () => {
            noteModel.create({title: "Title", content: "Content"});
            const note = noteModel.read(1);
            expect(note).toEqual({id: 1, title: "Title", content: "Content"});
        });

    });

    describe('Update Note', () => {

        beforeEach(() => {
            db('notes').truncate();
        });

        afterAll(() => {
            db('notes').truncate();
        });

        test("throws MissingParam when note object not present", () => {
            try {
                noteModel.update();
            } catch (e) {
                expect(e.name).toBe('MissingParam')
                expect(e.message).toBe('note object');
            }
        });

        test("throws TypeError when note is not object", () => {
            try {
                noteModel.update('Not object');
            } catch (e) {
                expect(e.name).toBe('TypeError')
                expect(e.message).toBe('note is not an object');
            }
        });

        test('throws InvalidID on invalid id', () => {
            try {
                noteModel.update(1);
            } catch (e) {
                expect(e.name).toBe('InvalidID');
                expect(e.message).toBe('id does not exist');
            }
        });

        test('throws EmptyObject on empty note object', () => {
            try {
                noteModel.create({title: "Title", content: "Content"});
                noteModel.update(id, {});
            } catch (e) {
                expect(e.name).toBe('EmptyObject');
                expect(e.message).toBe("note object missing 'title' and 'content'");
            }
        });

        test("throws TypeError when 'title' value is not string", () => {
            try {
                noteModel.create({title: "Title", content: "Content"});
                noteModel.upate({title: 0});
            } catch (e) {
                expect(e.name).toBe('TypeError')
                expect(e.message).toBe("'title' value must be string");
            }
        });

        test("throws TypeError when 'content' value is not string", () => {
            try {
                noteModel.create({title: "Title", content: "Content"});
                noteModel.update({content: 0});
            } catch (e) {
                expect(e.name).toBe('TypeError')
                expect(e.message).toBe("'content' value must be string");
            }
        });

        test('returns updated note object with title change', () => {
            noteModel.create({title: "Ttle", content: "Content"});
            const note = noteModel.update(id, {title: "Title"});
            expect(note).toEqual({id: 1, title: "Title", content: "Content"});
        });

        test('returns updated note object with content change', () => {
            noteModel.create({title: "Title", content: "Cntent"});
            const note = noteModel.update(id, {content: "Content"});
            expect(note).toEqual({id: 1, title: "Title", content: "Content"});
        });

        test('returns updated note object with title and content change', () => {
            noteModel.create({title: "Ttle", content: "Cntent"});
            const note = noteModel.update(id, {title: "Title", content: "Content"});
            expect(note).toEqual({id: 1, title: "Title", content: "Content"});
        });

    });

    describe('Delete Note', () => {

        beforeEach(() => {
            db('notes').truncate();
        });

        afterAll(() => {
            db('notes').truncate();
        });

        test('throws InvalidID on invalid id', () => {
            try {
                noteModel.delete(1);
            } catch (e) {
                expect(e.name).toBe('InvalidID');
                expect(e.message).toBe('id does not exist');
            }
        });

        test('returns count of 1 on record deleted', () => {
            const note = noteModel.create({title: "Title", content: "Content"});
            const count =  noteModel.delete(note.id);
            expect(count).toBe(1);
        });

    });

});