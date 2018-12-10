const request = require('supertest');
const server = require('./server');


describe('server endpoints', () => {
    it('be sure server is up and running', async () => {
       const response = await request(server).get('/');
       expect(response.status).toBe(200); 
    });
})