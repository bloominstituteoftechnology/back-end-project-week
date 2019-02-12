const request = require('supertest');
const { server } = require('../api/server');
const db = require('../database/dbConfig');


describe('The route handlers', () => {
    describe('Post /', () => {

        afterEach(async () => {
            await db('notes').truncate();
            await db.seed.run();
        });

        it('responds with 201 if body is correct', async () => {
            const body = {title: 'Coding is fun', description: 'Diandra made me do TDD. SOS', user_id: 3}
            const response = await request(server).post('/').send(body);

            expect(response.status).toBe(201);
            db('notes').truncate();
        });
    });

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