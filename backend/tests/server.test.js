const mongoose = require('mongoose');
const request = require('supertest');
const server = require('../server.js');

describe('Server', () => {
  beforeAll(done => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/lambdanotes-test');
    const db = mongoose.connection;
    db.on('error', () => console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('we are connected');
      done();
    });
  });

  afterAll(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
      console.log('we are disconnected');
    });
  });

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
