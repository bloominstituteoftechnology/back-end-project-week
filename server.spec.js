process.env.NODE_ENV = 'test';

const request = require('supertest');
const server = require('./server');

describe('server.js', () => {
  describe('/', () => {
    it('should return a status of 200', async () => {
      let response = await request(server).get('/');
      expect(response.status).toBe(200);
    });
  });
});
