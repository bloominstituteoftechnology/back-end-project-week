process.env.NODE_ENV = 'test';

const request = require('supertest');
const server = require('../../../server');
// const db = require('../../../data/dbConfig');

describe('auth.js', () => {
  describe('register', async () => {
    // let newUser = { username: 'jay', password: 'pass', email: 'jay@email.com' };
    it('should return a status of 400 if no username', async () => {
      let userNoUserName = { password: 'pass', email: 'jay@email.com' };
      await request(server)
        .post('/api/auth/register')
        .send(userNoUserName);
    });
    it('should return a status of 400 if no password', async () => {
      let userNoPassword = { username: 'jay', email: 'jay@email.com' };
      await request(server)
        .post('/api/auth/register')
        .send(userNoPassword);
    });
    it('should return a status of 400 if no email', async () => {
      let userNoEmail = { username: 'jay', password: 'pass' };
      await request(server)
        .post('/api/auth/register')
        .send(userNoEmail);
    });
    it('should return a message of "That username is taken." if username is already in database', async () => {
      let newUser = {
        username: 'ryan_walker',
        password: 'pass',
        email: 'rwalker@gmail.com'
      };
      let response = await request(server)
        .post('/api/auth/register')
        .send(newUser);
      expect(response.status).toBe(401);
      expect(response.body).toEqual({ message: 'That username is taken.' });
    });
    it('should return a message of "That email is already." if registered.', async () => {
      let newUser = {
        username: 'r_walker',
        password: 'pass',
        email: 'rwalker@gmail.com'
      };
      let response = await request(server)
        .post('/api/auth/register')
        .send(newUser);
      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: 'There is already an account registered with that email.'
      });
    });
  });
});
