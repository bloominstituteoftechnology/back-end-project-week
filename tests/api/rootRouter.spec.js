const request = require('supertest');
const app = require('../../app');

describe('Root API', () => {

    test('responds with 200', async () => {
        const response = await request(app).get("/api");
        expect(response.statusCode).toBe(200);
    });
    
    test('responds with json', async () => {
        const response = await request(app).get("/api");
        expect(response.type).toMatch(/json/i);
    });

});