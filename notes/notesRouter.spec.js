const request = require('supertest');
const { isAnArray } = require('@coetry/simpletypes');

const server = require('../api/server.js');

describe('notesRoutes.js', () => {
  describe('/api route', () => {
    it('should return status code 200', async () => {
      let response = await request(server).get('/notes/');

      expect(response.status).toBe(200);
    });

    it('should return JSON', async () => {
      let response = await request(server).get('/notes/');

      expect(response.type).toBe('text/html');
    });

    it(`should return with a message 'Server Listens and Obeys' `, async () => {
      let response = await request(server).get('/notes/');

      expect(response.text).toEqual('Server Listens and Obeys or WTFDoes it???');
    });
  });
});
