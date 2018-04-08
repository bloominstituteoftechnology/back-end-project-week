/* eslint-disable no-console, computed-property-spacing */
const mongoose = require('mongoose');
const request = require('supertest');
const server = require('../server.js');
const Note = require('../models/NoteModel.js');
const User = require('../models/UserModel.js');

// Test data to seed the tests
const testNoteInfo = {
  title: 'Test note title',
  content: 'Bla Balsd nmdas kljfd'
};

const testUserInfo = {
  username: 'Test User',
  password: '1234'
};

let testUserToken;

// BEFORE/AFTER ALL
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

// BEFORE/AFTER EACH
beforeEach(done => {
  const testNote = new Note(testNoteInfo);
  const testUser = new User(testUserInfo);

  request(server)
    // Seed the test user
    .post('/users')
    .send(testUser)
    .then(res => {
      testUserInfo.id = res.body.savedUser._id;
    })
    .then(() => {
      request(server)
        // Retrive a test token
        .post('/login')
        .send(testUserInfo)
        .then(res => {
          console.log(res.body.token)
          testUserToken = res.body.token;
          done();
        })
        .then(() => {
          request(server)
            // Seed the test note
            .post('/notes')
            .send(testNote)
            .then(res => {
              testNoteInfo.id = res.body._id;
            });
        });
    });
  // request(server)
  //   // Seed the test note
  //   .post('/notes')
  //   .send(testNote)
  //   .then(res => {
  //     testNoteInfo.id = res.body._id;
  //   })
  //   .then(() => {
  //     request(server)
  //       // Seed the test user
  //       .post('/users')
  //       .send(testUser)
  //       .then(res => {
  //         testUserInfo.id = res.body.savedUser._id;
  //       })
  //       .then(() => {
  //         request(server)
  //           // Retrive a test token
  //           .post('/login')
  //           .send(testUserInfo)
  //           .then(res => {
  //             testUserToken = res.body.token;
  //             done();
  //           })
  //           .catch(err => console.error(err));
  //       });
  //   });
}); // beforeEach

afterEach(done => {
  Note.remove({});
  User.remove({}).then(() => {
    User.collection.dropIndexes();
    done();
  });
});

// TESTS //
// Notes endpoints
describe('Notes endpoints', () => {
  test('[GET] /notes should retrieve an array of notes', done => {
  console.log(testUserToken)
    request(server)
      .get('/notes')
      .set('Authorization', testUserToken)
      .then(res => {
        expect(typeof res.body[0]).toBe('object');
        expect(res.body[0].title).toBe(testNoteInfo.title);
        expect(res.body[0].content).toBe(testNoteInfo.content);
        done();
      })
      .catch(err => console.error(err));
  });

  test('[GET] /notes/:id should retrieve the note by id', done => {
    request(server)
      .get(`/notes/${testNoteInfo.id}`)
      .set('Authorization', testUserToken)
      .then(res => {
        expect(res.body._id).toBe(testNoteInfo.id);
        expect(res.body.title).toBe(testNoteInfo.title);
        expect(res.body.content).toBe(testNoteInfo.content);
        done();
      })
      .catch(err => console.error(err));
  });

  test('[POST] should post a note correctly', done => {
    const newNoteInfo = {
      title: 'Testing post endpoint',
      content: 'Dummy content here'
    };
    request(server)
      .post('/notes')
      .set('Authorization', testUserToken)
      .send(newNoteInfo)
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('title', newNoteInfo.title);
        expect(res.body).toHaveProperty('content', newNoteInfo.content);
        done();
      })
      .catch(err => console.error(err));
  });

  test('[POST] should throw error if missing a title', done => {
    const newNoteInfo = {
      content: 'Dummy content here'
    };
    request(server)
      .post('/notes')
      .set('Authorization', testUserToken)
      .send(newNoteInfo)
      .then(res => {
        expect(res.body.message).toBe('You need to enter a title and content!');
        done();
      })
      .catch(err => console.error(err));
  });

  test('[PUT] should update notes correctly', done => {
    const updatedNoteInfo = { content: 'Updated note content here' };
    request(server)
      .put(`/notes/${testNoteInfo.id}`)
      .send(updatedNoteInfo)
      .then(res => {
        expect(res.body.message).toBe('Note updated successfully!');
        expect(res.body.updatedNote.content).toBe(updatedNoteInfo.content);
        expect(res.body.updatedNote._id).toBe(testNoteInfo.id);
        done();
      })
      .catch(err => console.error(err));
  });

  test('[DELETE] should delete the note correctly', done => {
    request(server)
      .delete(`/notes/${testNoteInfo.id}`)
      .then(res => {
        expect(res.body.message).toBe('Note deleted successfully!');
        expect(res.body.deletedNote.title).toBe(testNoteInfo.title);
        expect(res.body.deletedNote.content).toBe(testNoteInfo.content);
        expect(res.body.deletedNote._id).toBe(testNoteInfo.id);
        done();
      })
      .catch(err => console.error(err));
  });
});

// Users endpoints
describe('Users endpoints', () => {
  test('[POST] should create a new user correctly', done => {
    const newUser = { username: 'Elephant Man', password: '1234' };
    request(server)
      .post('/users')
      .send(newUser)
      .then(res => {
        expect(res.body.message).toBe('Successfully created!');
        expect(res.body.savedUser).toHaveProperty('_id');
        expect(res.body.savedUser).toHaveProperty('createdOn');
        expect(res.body.savedUser.password.length).toBe(60);
        expect(res.body.savedUser.username).toBe('elephant man');
        done();
      })
      .catch(err => console.error(err));
  });

  test('[POST] should throw error if password is not given', done => {
    const newUser = { username: 'Hagbard Celine' };
    const expectedMessage = 'You need to provide a username and password!';
    request(server)
      .post('/users')
      .send(newUser)
      .then(res => {
        expect(res.body.message).toBe(expectedMessage);
        done();
      })
      .catch(err => console.error(err));
  });

  test('[GET] should return all users', done => {
    const newUser = { username: 'Saul Goodman', password: '1234' };
    request(server)
      .post('/users')
      .send(newUser)
      .then(() => {
        request(server)
          .get('/users')
          .then(res => {
            expect(res.body.length).toBe(2);
            expect(res.body[1]).toHaveProperty('_id');
            expect(res.body[1]).toHaveProperty('username');
            expect(res.body[1]).toHaveProperty('password');
            expect(res.body[1].username).toBe('saul goodman');
            done();
          });
      })
      .catch(err => console.error(err));
  });

  test('[GET] by id should return the correct user', done => {
    request(server)
      .get(`/users/${testUserInfo.id}`)
      .then(res => {
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('username');
        expect(res.body).toHaveProperty('password');
        expect(res.body.username).toBe('test user');
        done();
      })
      .catch(err => console.error(err));
  });
});

describe('Login endpoint', () => {
  test('Login sends back token', done => {
    request(server)
      .post('/login')
      .send({ username: 'Test User', password: '1234' })
      .then(res => {
        expect(res.body).toHaveProperty('token');
        done();
      })
      .catch(err => console.error(err));
  });
  test('Incorrect password is handled correctly', done => {
    request(server)
      .post('/login')
      .send({ username: 'Test User', password: '4321' })
      .then(res => {
        expect(res.status).toBe(422);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe('Incorrect password');
        done();
      })
      .catch(err => console.error(err));
  });
});
