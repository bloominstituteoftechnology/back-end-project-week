const noteModel = require('../../data/models/noteModel');
const db = require('../../data/dbConfig');

describe('The Note Model', () => {

    describe('Insert Note', () => {

        beforeEach(async () => {
            await db('notes').truncate();
        });

        afterAll(async () => {
            await db('notes').truncate();
        });

        test("throws MissingParam when note object not present", async () => {
            try {
                await noteModel.insert();
            } catch (e) {
                expect(e.name).toBe('MissingParam');
                expect(e.message).toBe('note object');
            }
        });

        test("throws TypeError when note is not object", async () => {
            try {
                await noteModel.insert('Not object');
            } catch (e) {
                expect(e.name).toBe('TypeError');
                expect(e.message).toBe('note is not an object');
            }
        });

        test("throws MissingKey when 'title' key not present in note object", async () => {
            try {
                await noteModel.insert({ content: "Content" });
            } catch (e) {
                expect(e.name).toBe('MissingKey');
                expect(e.message).toBe('title');
            }
        });

        test("throws MissingKey when 'content' key not present in note object", async () => {
            try {
                await noteModel.insert({ title: "Title" });
            } catch (e) {
                expect(e.name).toBe('MissingKey');
                expect(e.message).toBe('content');
            }
        });

        test("throws TypeError when 'title' value is not string", async () => {
            try {
                await noteModel.insert({ title: 0, content: "Content" });
            } catch (e) {
                expect(e.name).toBe('TypeError');
                expect(e.message).toBe("'title' value must be string");
            }
        });

        test("throws TypeError when 'content' value is not string", async () => {
            try {
                await noteModel.insert({ title: "Title", content: 0 });
            } catch (e) {
                expect(e.name).toBe('TypeError');
                expect(e.message).toBe("'content' value must be string");
            }
        });

        test('returns new note object with id', async () => {
            const note = await noteModel.insert({ title: 'Title', content: 'Content' });
            expect(note).toEqual({ id: 1, title: 'Title', content: 'Content' });
        });

    });

    describe('Get All Notes', () => {

        beforeEach(async () => {
            await db('notes').truncate();
        });

        afterAll(async () => {
            await db('notes').truncate();
        });

        test('returns array of all notes', async () => {
            await noteModel.insert({ title: 'Title 1', content: 'Content 1' });
            await noteModel.insert({ title: 'Title 2', content: 'Content 2' });
            await noteModel.insert({ title: 'Title 3', content: 'Content 3' });

            const notes = await noteModel.get();
            expect(notes).toEqual([
                { id: 1, title: 'Title 1', content: 'Content 1' },
                { id: 2, title: 'Title 2', content: 'Content 2' },
                { id: 3, title: 'Title 3', content: 'Content 3' }
            ]);
        });

        test('returns empty array', async () => {
            const notes = await noteModel.get();
            expect(notes).toEqual([]);
        });

    });

    describe('Get Note by ID', () => {

        beforeEach(async () => {
            await db('notes').truncate();
        });

        afterAll(async () => {
            await db('notes').truncate();
        });

        test('throws InvalidID on invalid id', async () => {
            try {
                await noteModel.get(1);
            } catch (e) {
                expect(e.name).toBe('InvalidID');
                expect(e.message).toBe('id does not exist');
            }
        });

        test('returns note object by id', async () => {
            try {
                await noteModel.insert({ title: "Title", content: "Content" });
                const note = await noteModel.get(1);
            } catch (e) {
                expect(note).toEqual({ id: 1, title: "Title", content: "Content" });
            }
        });

    });

    describe('Update Note', () => {

        beforeEach(async () => {
            await db('notes').truncate();
        });

        afterAll(async () => {
            await db('notes').truncate();
        });

        test("throws MissingParam when note object not present", () => {
            noteModel.update();
            expect(e.name).toBe('MissingParam');
            expect(e.message).toBe('note object');
        });

        test("throws TypeError when note is not object", () => {
            noteModel.update('Not object');
            expect(e.name).toBe('TypeError');
            expect(e.message).toBe('note is not an object');
        });

        test('throws InvalidID on invalid id', () => {
            noteModel.update(1);
            expect(e.name).toBe('InvalidID');
            expect(e.message).toBe('id does not exist');
        });

        test('throws EmptyObject on empty note object', () => {
            noteModel.insert({ title: "Title", content: "Content" });
            noteModel.update(1, {});
            expect(e.name).toBe('EmptyObject');
            expect(e.message).toBe("note object missing 'title' and 'content'");
        });

        test("throws TypeError when 'title' value is not string", () => {
            noteModel.insert({ title: "Title", content: "Content" });
            noteModel.update({ title: 0 });
            expect(e.name).toBe('TypeError');
            expect(e.message).toBe("'title' value must be string");
        });

        test("throws TypeError when 'content' value is not string", () => {
            noteModel.insert({ title: "Title", content: "Content" });
            noteModel.update({ content: 0 });
            expect(e.name).toBe('TypeError');
            expect(e.message).toBe("'content' value must be string");
        });

        test('returns updated note object with title change', () => {
            noteModel.insert({ title: "Ttle", content: "Content" });
            const note = noteModel.update(id, { title: "Title" });
            expect(note).toEqual({ id: 1, title: "Title", content: "Content" });
        });

        test('returns updated note object with content change', () => {
            noteModel.insert({ title: "Title", content: "Cntent" });
            const note = noteModel.update(id, { content: "Content" });
            expect(note).toEqual({ id: 1, title: "Title", content: "Content" });
        });

        test('returns updated note object with title and content change', () => {
            noteModel.insert({ title: "Ttle", content: "Cntent" });
            const note = noteModel.update(id, { title: "Title", content: "Content" });
            expect(note).toEqual({ id: 1, title: "Title", content: "Content" });
        });

    });

    describe('Remove Note', () => {

        beforeEach(() => {
            db('notes').truncate();
        });

        afterAll(() => {
            db('notes').truncate();
        });

        test('throws InvalidID on invalid id', () => {
            noteModel.remove(1);
            expect(e.name).toBe('InvalidID');
            expect(e.message).toBe('id does not exist');
        });

        test('returns count of 1 on record removed', () => {
            const note = noteModel.insert({ title: "Title", content: "Content" });
            const count = noteModel.remove(note.id);
            expect(count).toBe(1);
        });

    });

});