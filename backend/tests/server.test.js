/* eslint-disable no-console, computed-property-spacing */
const mongoose = require('mongoose');
const request = require('supertest');
const server = require('../server.js');
const Note = require('../models/NoteModel.js');

const testNoteInfo = {
  title: 'Test note title',
  content: 'Bla Balsd nmdas kljfd'
};

beforeAll(done => {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/lambdanotes-test');
  const db = mongoose.connection;
  db.on('error', () => console.error.bind(console, 'connection error'));
  db.once('open', () => {
    console.log('Test DB connected');
    done();
  });
});

afterAll(done => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(done);
    console.log('Test DB disconnected');
  });
});

beforeEach(done => {
  const testNote = new Note(testNoteInfo);
  request(server)
    .post('/notes')
    .send(testNote)
    .then(res => {
      testNoteInfo.id = res.body._id;
      done();
    });
});

afterEach(done => {
  Note.remove({ title: 'Test note title' }).then(() => {
    done();
  });
});

describe('Server', () => {
  test('GET Notes /notes', done => {
    request(server)
      .get('/notes')
      .then(res => {
        expect(typeof res.body[0]).toBe('object');
        expect(res.body[0].title).toBe('Test note title');
        done();
      })
      .catch(err => {
        console.err(err);
        done();
      });
  });

  test('GET Note by ID /notes/:id', done => {
    request(server)
      .get(`/notes/${testNoteInfo.id}`)
      .then(res => {
        expect(res.body._id).toBe(testNoteInfo.id);
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });
});
