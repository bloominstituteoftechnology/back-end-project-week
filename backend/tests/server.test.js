/* eslint-disable no-console, computed-property-spacing */
const mongoose = require('mongoose');
const request = require('supertest');
const server = require('../server.js');
const Note = require('../models/NoteModel.js');

// Test note info to seed the tests
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
  Note.remove({}).then(() => {
    done();
  });
});

describe('Notes endpoints', () => {
  test('[GET] /notes should retrieve an array of notes', done => {
    request(server)
      .get('/notes')
      .then(res => {
        expect(typeof res.body[0]).toBe('object');
        expect(res.body[0].title).toBe(testNoteInfo.title);
        expect(res.body[0].content).toBe(testNoteInfo.content);
        done();
      })
      .catch(err => {
        console.err(err);
        done();
      });
  });

  test('[GET] /notes/:id should retrieve the note by id', done => {
    request(server)
      .get(`/notes/${testNoteInfo.id}`)
      .then(res => {
        expect(res.body._id).toBe(testNoteInfo.id);
        expect(res.body.title).toBe(testNoteInfo.title);
        expect(res.body.content).toBe(testNoteInfo.content);
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });

  test('[POST] should post a note correctly', done => {
    const newNoteInfo = {
      title: 'Testing post endpoint',
      content: 'Dummy content here'
    };
    request(server)
      .post('/notes')
      .send(newNoteInfo)
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('title', newNoteInfo.title);
        expect(res.body).toHaveProperty('content', newNoteInfo.content);
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });

  test('[POST] should throw error if missing a title', done => {
    const newNoteInfo = {
      content: 'Dummy content here'
    };
    request(server)
      .post('/notes')
      .send(newNoteInfo)
      .then(res => {
        expect(res.body.message).toBe('You need to enter a title and content!');
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });
});
