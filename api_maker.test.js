

//== API Maker Test ============================================================

//-- Dependencies --------------------------------
const request = require('supertest');
const express = require('express'  );
const config     = require('./config.js'     );
const apiMaker   = require('./api_maker.js'  );
const dataAccess = require('./data_access.js');


//== CRUD Tests ================================================================

const testData = dataAccess(config.TABLE_NOTES)
const testAPI = apiMaker(testData);
const testServer = express();
testServer.use(express.json());
testServer.use(testAPI       );
describe('Test API Maker', () => {

    //-- Get All -------------------------------------
    describe('Test Get All Endpoint', function () {
        const endPoint = '/';
        beforeAll(async function () {
            await testData.clear();
            await testData.create({
                [config.FIELD_TITLE]: 'Test Entry 1'  ,
                [config.FIELD_BODY ]: 'Test Content 1',
            });
            await testData.create({
                [config.FIELD_TITLE]: 'Test Entry 2'  ,
                [config.FIELD_BODY ]: 'Test Content 2',
            });
        });
        test('Responds with status 200', async function () {
            const response = await request(testServer).get(endPoint);
            expect(response.status).toBe(200);
        });
        test('Responds with JSON', async function () {
            const response = await request(testServer).get(endPoint);
            expect(response.type).toBe(config.MIME_APPLICATION_JSON);
        });
        test('Responds with an array', async function () {
            const response = await request(testServer).get(endPoint);
            expect(Array.isArray(response.body.data)).toBeTruthy();
        });
        test('Responds with all entries', async function () {
            const response = await request(testServer).get(endPoint);
            expect(response.body.data.length).toBe(2);
        });
    });

    //-- Get by ID -----------------------------------
    describe('Test Get by ID Endpoint', function () {
        const endPoint = '/2';
        beforeAll(async function () {
            await testData.clear();
            await testData.create({
                [config.FIELD_TITLE]: 'Test Entry 1'  ,
                [config.FIELD_BODY ]: 'Test Content 1',
            });
            await testData.create({
                [config.FIELD_TITLE]: 'Test Entry 2'  ,
                [config.FIELD_BODY ]: 'Test Content 2',
            });
        });
        test('Responds with status 200', async function () {
            const response = await request(testServer).get(endPoint);
            expect(response.status).toBe(200);
        });
        test('Responds with JSON', async function () {
            const response = await request(testServer).get(endPoint);
            expect(response.type).toBe(config.MIME_APPLICATION_JSON);
        });
        test('Responds with Entry', async function () {
            const response = await request(testServer).get(endPoint);
            expect(response.body).toEqual({
                [config.FIELD_ID   ]: 2               ,
                [config.FIELD_TITLE]: 'Test Entry 2'  ,
                [config.FIELD_BODY ]: 'Test Content 2',
            });
        });
        test('Handles unknown IDs (404)', async function () {
            const testResponse = await request(testServer).get('/3');
            expect(testResponse.status).toBe(404);
            expect(testResponse.body.message).toBe(config.ERROR_NOTFOUND);
        });
    });
    
    //-- Create --------------------------------------
    describe('Test Create Endpoint', function () {
        const endPoint = '/';
        const testEntry = {
            [config.FIELD_TITLE]: 'Test Entry'  ,
            [config.FIELD_BODY ]: 'Test Content',
        };
        beforeEach(async function () {
            await testData.clear();
        });
        test('Responds with status 201', async function () {
            const response = await request(testServer)
                .post(endPoint)
                .send(testEntry);
            expect(response.status).toBe(201);
        });
        test('Responds with JSON', async function () {
            const response = await request(testServer)
                .post(endPoint)
                .send(testEntry);
            expect(response.type).toBe(config.MIME_APPLICATION_JSON);
        });
        test('Responds with Entry', async function () {
            const response = await request(testServer)
                .post(endPoint)
                .send(testEntry);
            expect(response.body).toEqual({
                [config.FIELD_ID   ]: 1             ,
                [config.FIELD_TITLE]: 'Test Entry'  ,
                [config.FIELD_BODY ]: 'Test Content',
            });
        });
        test('Handles malformed data (422)', async function () {
            const testResponse = await request(testServer)
                .post(endPoint)
                .send({});
            expect(testResponse.status).toBe(422);
            expect(testResponse.body.message).toBe(config.ERROR_MALFORMEDDATA);
        });
    });
    
    //-- Delete --------------------------------------
    describe('Test Delete Endpoint', function () {
        const endPoint = '/1';
        beforeEach(async function () {
            await testData.clear();
            await testData.create({
                [config.FIELD_TITLE]: 'Test Entry'  ,
                [config.FIELD_BODY ]: 'Test Content',
            });
        });
        test('Responds with status 200', async function () {
            const response = await request(testServer).delete(endPoint);
            expect(response.status).toBe(200);
        });
        test('Responds with JSON', async function () {
            const response = await request(testServer).delete(endPoint);
            expect(response.type).toBe(config.MIME_APPLICATION_JSON);
        });
        test('Responds with Entry', async function () {
            const response = await request(testServer).delete(endPoint);
            expect(response.body).toEqual({
                [config.FIELD_ID   ]: 1             ,
                [config.FIELD_TITLE]: 'Test Entry'  ,
                [config.FIELD_BODY ]: 'Test Content',
            })
        });
        test('Actually Deletes Entry', async function () {
            await request(testServer).delete(endPoint);
            let result;
            try { await testData.get(1);}
            catch(error) { result = error;}
            expect(result).toBeTruthy();
            expect(result.message).toBe(config.ERROR_NOTFOUND);
        });
        test('Handles unknown IDs (404)', async function () {
            const testResponse = await request(testServer).delete('/3');
            expect(testResponse.status).toBe(404);
            expect(testResponse.body.message).toBe(config.ERROR_NOTFOUND);
        });
    });
    
    //-- Update --------------------------------------
    describe('Test Update Endpoint', function () {
        const endPoint = '/1';
        let testUpdate = {
            [config.FIELD_TITLE]: 'Updated Entry'  ,
            [config.FIELD_BODY ]: 'Updated Content',
        };
        beforeEach(async function () {
            await testData.clear();
            await testData.create({
                [config.FIELD_TITLE]: 'Test Entry'  ,
                [config.FIELD_BODY ]: 'Test Content',
            });
        });
        test('Responds with status 200', async function () {
            const response = await request(testServer)
                .put(endPoint)
                .send(testUpdate);
            expect(response.status).toBe(200);
        });
        test('Responds with JSON', async function () {
            const response = await request(testServer)
                .put(endPoint)
                .send(testUpdate);
            expect(response.type).toBe(config.MIME_APPLICATION_JSON);
        });
        test('Responds with Entry', async function () {
            const response = await request(testServer)
                .put(endPoint)
                .send(testUpdate);
            expect(response.body).toEqual({
                [config.FIELD_ID   ]: 1                ,
                [config.FIELD_TITLE]: 'Updated Entry'  ,
                [config.FIELD_BODY ]: 'Updated Content',
            });
        });
        test('Actually Updates Entry', async function () {
            await request(testServer).put(endPoint).send(testUpdate);
            let result = await testData.get(1);
            expect(result).toBeTruthy();
            expect(result).toEqual({
                [config.FIELD_ID   ]: 1                ,
                [config.FIELD_TITLE]: 'Updated Entry'  ,
                [config.FIELD_BODY ]: 'Updated Content',
            });
        });
        test('Handles unknown IDs (404)', async function () {
            const testResponse = await request(testServer).put('/3').send({
                [config.FIELD_TITLE]: 'Updated Entry'  ,
                [config.FIELD_BODY ]: 'Updated Content',
            });
            expect(testResponse.status).toBe(404);
            expect(testResponse.body.message).toBe(config.ERROR_NOTFOUND);
        });
    });
});
