const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');
const server = require('./server.js');

chai.use(chaiHTTP);

const Note = require('./models/notes-model');

describe('Notes', () => {
  before((done) => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/test');
    const db = mongoose.connection;
    db.on('error', () => console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('we are connected');
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
      console.log('we are disconnected');
    });
  });

  let noteId = null;
  let testNote = null;

  beforeEach((done) => {
    const newNote = new Note({
      noteTitle: 'Tuesday Todos',
      noteBody: 'Here is a list of todos.'
    });
    newNote
      .save()
      .then((Note) => {
        testNote = Note;
        noteId = Note._id;
        done();
      })
      .catch((err) => {
        console.error(err);
        done();
      });
  });

  afterEach((done) => {
    Note.remove({}, (err) => {
      if (err) console.error(err);
      done();
    });
  });

  describe('[POST] /api/note/create', () => {
    it('should save a new Note to the db', (done) => {
      const newNote = {
        noteTitle: 'Tuesday Todos',
        noteBody: 'Here is a list of todos.'
      };
      chai
        .request(server)
        .post('/api/Note/create')
        .send(newNote)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Tuesday Todos');
        });
      done();
    });
  });

  describe('[GET] /api/notes', () => {
    it('should return all Notes from the db', (done) => {
      chai
        .request(server)
        .get('/api/notes')
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body[0].title).to.equal('Tuesday Todos');
        });
      done();
    });
  });

  describe('[PUT] /api/note/update', () => {
    it('should return the updated Note', (done) => {
      const updatedNote = {
        title: 'Tuesday Todos',
        id: noteId,
      };
      chai
        .request(server)
        .put('/api/note/update')
        .send(updatedNote)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Tuesday Todos');
        });
      done();
    });
  });

  describe('[DELETE] /api/note/delete', () => {
    it('should return the title', (done) => {
      chai
        .request(server)
        .delete('/api/note/delete' + noteId)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('success');
        });
      done();
    });
  });
});
