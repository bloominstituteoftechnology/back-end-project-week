const request = require('supertest');
const app = require('../app');

describe('Server App', () => {

    test('responds with 200', async () => {
        const response = await request(app).get("/")
        expect(response.statusCode).toBe(200);
    });

    test('responds with html', async () => {
        const response = await request(app).get("/")
        expect(response.type).toMatch(/html/i);
    });

});