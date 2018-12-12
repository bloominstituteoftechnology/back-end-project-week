const request = require('supertest');
const server = require('./api/server.js');
const db = require('./data/dbConfig');
describe('server.js', () => {
    describe('/', () => {
        it ('should return status code of 200', async () => {
            let response = await request(server).get('/');
            
            expect (response.status).toBe(200);
        })

        it ('should return JSON', async () => {
            let response = await request(server).get('/');

            expect (response.type).toBe('application/json');
        })
    })

    describe('/api/notes', () => {
        it ('should return status code of 200', async () => {
            let response = await request(server).get('/api/notes');
            
            expect (response.status).toBe(200);
        })

        it ('should return JSON', async () => {
            let response = await request(server).get('/api/notes');

            expect (response.type).toBe('application/json');
        })
    })

    beforeEach(async () => {
        await db('notes').truncate();
    });
})