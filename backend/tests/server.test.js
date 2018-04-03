/* eslint-disable no-console */
const mongoose = require('mongoose');
const request = require('supertest');
const server = require('../server.js');
const Note = require('../models/NoteModel.js');

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

  beforeEach(done => {
    const testNote = new Note({
      title: 'Test note title',
      content: 'Bla Balsd nmdas kljfd'
    });
    request(server)
      .post('/notes')
      .send(testNote)
      .then(res => {
        done();
      });
  });

  afterEach(done => {
    Note.remove({ title: 'Test note title' }).then(res => {
      done();
    });
  });

  test('GET Notes /notes', done => {
    request(server)
      .get('/notes')
      .then(res => {
        console.log(res.body);
        expect(typeof res.body[0]).toBe('object');
        done();
      });
  });
});
