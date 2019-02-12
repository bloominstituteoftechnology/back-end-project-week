const request = require('supertest');
const { server } = require('../api/server');


describe('The route handlers', () => {
    describe('Get /', () => {
        it('responds with 200', async () => {
            const response = await request(server).get('/');

            expect(response.status).toBe(200);
        });

        it('responds with an object', async () => {
            const response = await request(server).get('/');

            expect(typeof response.body).toBe('object');
        });
    });
});