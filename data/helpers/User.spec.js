process.env.NODE_ENV = 'test';

const users = require('./User');
// const db = require('../dbConfig');

describe('helpers/User.js', () => {
  describe('getAll()', () => {
    it('should return a list of emails and usernames', async () => {
      const rows = await users.getAll();
      expect(Array.isArray(rows)).toBe(true);
      expect(rows[0].password).toBeFalsy;
      expect(rows[0].email).toBeTruthy;
      expect(rows[0].username).toBeTruthy;
    });
  });
  describe('get()', () => {
    it('should return a user object with an array of posts', async () => {
      const id = 1;
      const userWithPosts = await users.get(id);
      expect(typeof userWithPosts).toBe('object');
      expect(userWithPosts.notes).toBeTruthy();
      expect(Array.isArray(userWithPosts.notes)).toBe(true);
    });
  });
});
