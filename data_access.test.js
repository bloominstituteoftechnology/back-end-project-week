

//== Data Access Test ==========================================================

//-- Dependencies --------------------------------
const dataAccess = require('./data_access.js');
const config = require('./config.js');


//== Crud Tests ================================================================

describe('Test Data Access', function () {
    let noteDB = dataAccess(config.TABLE_NOTES);

    //-- Clear table ---------------------------------
    describe('Clear Data', function () {
        test('Clears all entries', async function () {
            await noteDB.create({
                [config.FIELD_TITLE]: 'Test Note'   ,
                [config.FIELD_BODY ]: 'TextTextText',
            });
            await noteDB.clear();
            let notes = await noteDB.getAll();
            expect(notes.length).toBe(0);
        });
    });

    //-- Create Entry --------------------------------
    describe('Create Entry', function () {
        beforeEach(async function () {
            await noteDB.clear();
        });
        let testData = {
            [config.FIELD_TITLE]: 'Test Note'   ,
            [config.FIELD_BODY ]: 'TextTextText',
        };
        test('Returns created entry, with id', async function () {
            expect(await noteDB.create(testData)).toEqual({
                [config.FIELD_ID   ]: 1             ,
                [config.FIELD_TITLE]: 'Test Note'   ,
                [config.FIELD_BODY ]: 'TextTextText',
            });
        });
        test('Throws errors with incorrect submissions', async function () {
            let result;
            try { await noteDB.create({});}
            catch(error) { result = error;}
            expect(result).toBeTruthy();
            expect(result.message).toBe(config.ERROR_MALFORMEDDATA);
        });
    });

    //-- Get Entry -----------------------------------
    describe('Get Entry', function () {
        beforeAll(async function () {
            await noteDB.clear();
            await noteDB.create({
                [config.FIELD_TITLE]: 'Test Note'   ,
                [config.FIELD_BODY ]: 'TextTextText',
            });
        });
        test('Returns entry from provided id', async function () {
            expect(await noteDB.get(1)).toEqual({
                [config.FIELD_ID   ]: 1             ,
                [config.FIELD_TITLE]: 'Test Note'   ,
                [config.FIELD_BODY ]: 'TextTextText',
            });
        });
        test('Throws errors with invalid ids (not found)', async function () {
            let result;
            try { await noteDB.get(2);}
            catch(error) { result = error;}
            expect(result).toBeTruthy();
            expect(result.message).toBe(config.ERROR_NOTFOUND);
        });
    });
    
    //-- Get All Entries -----------------------------
    describe('Get All Entries', function () {
        beforeAll(async function () {
            await noteDB.clear();
            await noteDB.create({
                [config.FIELD_TITLE]: 'Test Note'   ,
                [config.FIELD_BODY ]: 'TextTextText',
            });
            await noteDB.create({
                [config.FIELD_TITLE]: 'Test Note 2' ,
                [config.FIELD_BODY ]: 'TextTextText',
            });
        });
        test('Returns array of all entries', async function () {
            let notesArray = await noteDB.getAll();
            expect(Array.isArray(notesArray)).toBeTruthy();
            expect(notesArray.length).toBe(2);
        });
    });
    
    //-- Delete Entry --------------------------------
    describe('Delete Entry', function () {
        beforeEach(async function () {
            await noteDB.clear();
            await noteDB.create({
                [config.FIELD_TITLE]: 'Test Note'   ,
                [config.FIELD_BODY ]: 'TextTextText',
            });
        });
        test('Returns entry from provided id', async function () {
            expect(await noteDB.remove(1)).toEqual({
                [config.FIELD_ID   ]: 1             ,
                [config.FIELD_TITLE]: 'Test Note'   ,
                [config.FIELD_BODY ]: 'TextTextText',
            });
        });
        test('Removes entry from data', async function () {
            await noteDB.remove(1);
            let notesArray = await noteDB.getAll();
            expect(notesArray.length).toBe(0);
        });
        test('Throws errors with invalid ids (not found)', async function () {
            let result;
            try { await noteDB.remove(2);}
            catch(error) { result = error;}
            expect(result).toBeTruthy();
            expect(result.message).toBe(config.ERROR_NOTFOUND);
        });
    });
    
    //-- Update Entry --------------------------------
    describe('Update Entry', async function () {
        const testUpdate = {
            [config.FIELD_TITLE]: 'New Title'    ,
            [config.FIELD_BODY ]: 'UPDATE_UPDATE',
        };
        beforeEach(async function () {
            await noteDB.clear();
            await noteDB.create({
                [config.FIELD_TITLE]: 'Test Note'   ,
                [config.FIELD_BODY ]: 'TextTextText',
            });
        });
        
        test('Returns updated entry', async function () {
            expect(await noteDB.update(1, testUpdate)).toEqual({
                [config.FIELD_ID   ]: 1              ,
                [config.FIELD_TITLE]: 'New Title'    ,
                [config.FIELD_BODY ]: 'UPDATE_UPDATE',
            });
        });
        test('Updates data', async function () {
            await noteDB.update(1, testUpdate);
            expect(await noteDB.get(1)).toEqual({
                [config.FIELD_ID   ]: 1              ,
                [config.FIELD_TITLE]: 'New Title'    ,
                [config.FIELD_BODY ]: 'UPDATE_UPDATE',
            });
        });
        test('Throws errors with invalid ids (not found)', async function () {
            let result;
            try { await noteDB.update(2, testUpdate);}
            catch(error) { result = error;}
            expect(result).toBeTruthy();
            expect(result.message).toBe(config.ERROR_NOTFOUND);
        });
    });
});
