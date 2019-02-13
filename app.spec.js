const request = require('supertest');
const app = require('./app');

describe('Server App', () => {
    test('is running', async () => {
        const response = await request(app).get("/")
        expect(response.statusCode).toBe(200);
    });
});