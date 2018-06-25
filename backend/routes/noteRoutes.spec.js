const request = require('supertest');
const httpStatus = require('../utils/HTTPStatusCodes');

const express = require('express');

const environ = () => {
  const server = express();
  const noteRoutes = require('./noteRoutes');

  server.get('/', (req, res) => {
    res.status(httpStatus.noContent);
  });

  // server.use('/notes', noteRoutes);

  return server;
};

describe('Note Routes:', () => {

  it('Tests are testing.', () => {
    expect('sanity check').toBe('sanity check');
    expect(true).toBeTruthy();
  });

  describe('Requests:', () => {
    console.log('what the fuck is this?:',environ);
    it('responds with request to root.', async () => {
      const response = await request(environ()).get('/');
      const { status } = response;

      expect(status).toBe(httpStatus.imATeapot);
    });
  });
});