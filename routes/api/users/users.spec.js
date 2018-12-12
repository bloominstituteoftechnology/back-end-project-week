process.env.NODE_ENV = 'test';

const request = require('supertest');
const server = require('../../../server');
const db = require('../../../data/dbConfig');

// beforeEach(async () => {
//   await db.migrate.rollback();
//   await db.migrate.rollback();
//   await db.migrate.latest();
//   await db.seed.run();
// });

describe('users.js', () => {
  describe('GET ALL USERS', () => {
    it('should have a status code of 200', async () => {
      const response = await request(server).get('/api/users');
      expect(response.status).toBe(200);
    });
    it('should return an array', async () => {
      const response = await request(server).get('/api/users');
      expect(Array.isArray(response.body)).toBe(true);
    });
    it('should have a length of 3 users', async () => {
      const response = await request(server).get('/api/users');
      expect(response.body).toHaveLength(3);
    });
  });
  describe('GET USER WITH POSTS', () => {
    it('should have a status code of 200', async () => {
      const response = await request(server).get('/api/users/1');
      expect(response.status).toBe(200);
    });
    it('should return an object with a posts array', async () => {
      const response = await request(server).get('/api/users/1');
      expect(typeof response.body).toBe('object');
      expect(Array.isArray(response.body.notes)).toBe(true);
    });
  });
});
