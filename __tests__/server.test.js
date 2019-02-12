const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');

describe('The route handlers', () => {
    describe('Get /', () => {
        it('responds with 200', async () => {
            const response = await request(server).get('/');

            expect(response.status).toBe(200);
        });
    });
});