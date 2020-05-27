const request = require('supertest');
const server = require('../API/server');

describe('Auth Router', () => {
  it('tests are running with NODE_ENV set as "test"', () => {
    expect(process.env.NODE_ENV).toBe('test');
  });
  describe('Register', () => {
    it('returns 201 on successful create', async () => {
      const expectedStatus = 201;
      const response = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'blah',
          password: 'Test'
        });
      expect(response.status).toBe(expectedStatus);
      expect(response.type).toBe('application/json');
    });
    it('returns 400 on duplicate username', async () => {
      const expectedStatus = 400;
      const response = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'Krystal',
          password: 'Test'});
      expect(response.status).toBe(expectedStatus);
      expect(response.type).toBe('application/json');
    });
  });
  describe('Login', () => {
    it('returns 401 on unknown User', async () => {
      const expectedStatus = 401;
      const response = await request(server)
        .post('/api/auth/login')
        .send({ username: 'NotHere', password: 'Test' });
      expect(response.status).toBe(expectedStatus);
    });
    it('returns 401 on Incorrect Password', async () => {
      const expectedStatus = 401;
      const response = await request(server)
        .post('/api/auth/login')
        .send({ username: 'Krystal', password: 'BadPassword' });
      expect(response.status).toBe(expectedStatus);
    });
    it('returns 200 on Successful Login', async () => {
      const expectedStatus = 200;
      const response = await request(server)
        .post('/api/auth/login')
        .send({ username: 'Krystal', password: 'password' });
      expect(response.status).toBe(expectedStatus);
    });
  });
});