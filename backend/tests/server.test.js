const server = require('../server.js');
const request = require('supertest');

describe('Server', () => {
  test('GET notes', done => {
    request(server)
      .get('/test')
      .then(res => {
        expect(res.text).toBe('Bada Bing Bada Boom!');
        console.log(res.text);
        done();
      });
  });
});
