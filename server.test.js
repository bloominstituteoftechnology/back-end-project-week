const mongoose = require('mongoose');
const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;

const server = require('./server');
chai.use(chaihttp);

const User = require('./api/models/userModel');
const Note = require('./api/models/noteModel');

let userId;
let testToken;

describe('Server Tests', () => {
  before(done => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/test');
    const db = mongoose.connection;
    db.on('error', () => console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('Connected!');
      done();
    });
  });

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
      console.log('Disconnected!');
    });
  });

  describe('Users', () => {
    beforeEach(async function() {
      let newUser = await Promise.resolve(
        new User({
          username: 'Mega Man',
          password: 'fish_tacos',
      }).save()).catch(err => {
        return console.error(err);
      });
        return userId = newUser._id;
    });

    afterEach(async function() {
      await User.remove({}, (err) => {
        if (err) {
          return console.log(err);
        };
        return mongoose.connection.db.dropDatabase();
      });
    });

    describe('[POST] /api/users', () => {
      it('should add a new user', async function() {
        const user = {
          username: 'Tester',
          password: 'fish_tacos'
        };

        const res = await Promise.resolve(chai.request(server).post('/api/users').send(user)).catch(err => console.error(err));
        expect(res.status).to.equal(200);
        expect(res.body.savedUser.username).to.equal('tester');
      });

      it('should return HTTP status 422 when failing to save to the database', async function() {
        const user = {
          username: 'Tester',
          password: 'fish_tacos'
        };

        const res = await Promise.resolve(chai.request(server).post('/api/users').send(user)).catch(err => {
          return expect(err.status).to.equal(422);
        }); 
      });
    });

    describe('[POST] /api/login', () => {
      it('should allow an authorized user to login', async function() {
        const user = {
          username: 'Mega Man',
          password: 'fish_tacos'
        };

        const res = await Promise.resolve(chai.request(server).post('/api/login').send(user)).catch(err => console.error(err));
        testToken = res.body.token;
        expect(res.status).to.equal(200);
        expect(res.body.token).to.have.length.least(1);
      });

      it('should return HTTP status 422 when failing to login', async function() {
        const user = {
          username: 'Tester',
          password: 'no_fish_tacos'
        };

        const res = await Promise.resolve(chai.request(server).post('/api/login').send(user)).catch(err => {
          return expect(err.status).to.equal(422);
        }); 
      });
    });
  });

  describe('Notes', () => {
    let authHeaders = {
      "Authorization": undefined,
      "uuID": undefined,
    };

    beforeEach(async function() {
      authHeaders = {
        "Authorization": testToken,
        "uuID": userId,
      };
      let newNote = await Promise.resolve(
        new Note({
          author: userId,
          title: 'Note title test',
          body: 'Note body test',
      }).save()).catch(err => {
        return console.error(err);
      });
        return noteId = newNote._id;
    });

    afterEach(async function() {
      await Note.remove({}, (err) => {
        if (err) {
          return console.log(err);
        };
        return mongoose.connection.db.dropDatabase();
      });
    });

    describe('[POST] /api/notes', () => {
      it('should add a new note', async function() {
        const note = {
          author: userId,
          title: 'New Note',
          body: 'New Note Body'
        };
        const res = await Promise.resolve(chai.request(server).post('/api/notes').set(authHeaders).send(note)).catch(err => console.error(err));
        expect(res.status).to.equal(200);
        expect(res.body.savedNote.title).to.equal('New Note');
        expect(res.body.savedNote.body).to.equal('New Note Body');
      });

      it('should return HTTP status 422 when failing to save to the database', async function() {
        const note = {
          author: 'not_a_valid_ObjectID',
          title: 'New Note',
          body: 'New Note Body'
        };

        const res = await Promise.resolve(chai.request(server).post('/api/notes').set(authHeaders).send(note)).catch(err => {
          expect(err.name).to.equal('ValidationError');
          return expect(err.status).to.equal(422);
        }); 
      });
    });

    describe('[GET] /api/notes', () => {
      it('should return all notes for authorized user in the database', async function() {
        const res = await Promise.resolve(chai.request(server).get('/api/notes').set(authHeaders)).catch(err => console.error(err));
        expect(res.status).to.equal(200);
        expect(res.body.allNotes.length).to.equal(1);
      });

      it('should return an array', async function() {
        const res = await Promise.resolve(chai.request(server).get('/api/notes').set(authHeaders)).catch(err => console.error(err));
        expect(Array.isArray(res.body.allNotes)).to.equal(true);
      });
    });

    describe('[PUT] /api/notes', () => {
      it('should update a note document in the database', async function() {
        const note = {
          _id: noteId,
          title: 'New Note',
          body: 'New Note Body'
        };

        const res = await Promise.resolve(chai.request(server).put('/api/notes').send(note).set(authHeaders)).catch(err => console.error(err));
        console.log(res.body);
        expect(res.body.title).to.equal('New Note');
        expect(res.body.body).to.equal('New Note Body');
      });

      it('should return HTTP status 422 when no title is provided', async function() {
        const note = {
          body: 'New Note Body'
        };

        const res = await Promise.resolve(chai.request(server).put('/api/game/update').send(note).set(authHeaders)).catch(err => {
          return expect(err.status).to.equal(422);
        }); 
      });

      it('should return HTTP status 422 when no body is provided', async function() {
        const note = {
          title: 'New Note',
        };

        const res = await Promise.resolve(chai.request(server).put('/api/game/update').send(note).set(authHeaders)).catch(err => {
          return expect(err.status).to.equal(422);
        }); 
      });
    });

    describe('[DELETE] /api/notes:id', () => {
      it('should remove the specified note from the database', async function() {
        const res = await Promise.resolve(chai.request(server).delete(`/api/notes/${noteId}`).set(authHeaders)).catch(err => console.error(err));
        const deletedNote = await Promise.resolve(Note.findById(noteId)).catch(err => console.error(err));

        expect(deletedNote).to.equal(null);
      });

      it('should return HTTP status 422 when an invalid ID is provided', async function() {
        const res = await Promise.resolve(chai.request(server).delete(`/api/notes/I_am_an_invalid_ID`).set(authHeaders)).catch(err => {
          return expect(err.status).to.equal(422)
        });
      });
    });
  });
});
