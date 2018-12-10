process.env.NODE_ENV = 'test';

const request = require('supertest');
const server = require('../../../server');

describe('/api/notes', () => {
  describe('GET all notes', () => {
    it('should return a status of 200', async () => {
      let response = await request(server).get('/api/notes');
      expect(response.status).toBe(200);
    });
  });
});
