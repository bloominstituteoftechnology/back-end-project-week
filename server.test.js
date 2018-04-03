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
      .then((note) => {
        testNote = note;
        noteId = note._id;
        done();
      })
      .catch((err) => {
        console.error(err);
        done();
      });
  });

  afterEach((done) => {
    Note.remove({}, (err) => {
      if (err) {
        done(err);
      } else done();
    });
  });

  describe('[POST] /api/note/create', () => {
    it('should save a new Note to the db', (done) => {
      const newNote = {
        noteTitle: 'Wednesday Todos',
        noteBody: 'Here is another list of todos.'
      };
      chai
        .request(server)
        .post('/api/note/create')
        .send(newNote)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body.noteTitle).to.equal('Wednesday Todos');
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
            console.error();
            done(err);
          }
          expect(res.status).to.equal(200);
          expect(res.body[0].noteTitle).to.equal('Tuesday Todos');
        });
      done();
    });
  });

  describe('[GET] /api/note/:id', () => {
    it('should get a note by ID', (done) => {
      // console.log(noteId)
      chai
        .request(server)
        .get('/api/note/' + noteId)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body.noteTitle).to.equal('Tuesday Todos');
        });
      done();
    });
  });

  // describe('[PUT] /api/note', () => {
  //   it('should return the updated Note', (done) => {
  //     const updatedNote = {
  //       noteTitle: 'Wednesday Todos',
  //       noteBody: 'No Todos Here',
  //       id: noteId
  //     };
  //     console.log('id in put test', noteId);
  //     chai
  //       .request(server)
  //       .put('/api/note/update')
  //       .send(updatedNote)
  //       .end((err, res) => {
  //         console.log(res.body)
  //         if (err) {
  //           done(err);
  //         }
  //         expect(res.status).to.equal(200);
  //         expect(res.body.noteTitle).to.equal('Wednesday Todos');
  //       });
  //     done();
  //   });
  // });

  describe('[DELETE] /api/note', () => {
    it('Should delete the note by id', (done) => {
      const idToDelete = {
        id: noteId,
      }
      chai
        .request(server)
        .delete('/api/note')
        .send(idToDelete)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body).to.not.be.undefined;
        });
      done();
    });
  });
});
