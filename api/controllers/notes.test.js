const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');
const notes = require('./notes');

const Note = require('../models/noteModels');

chai.use(chaiHTTP);

describe('Notes', () => {
  before(done => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/test');
    const db = mongoose.connection;
    db.on('error', () => console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('we are connected');
      done();
    });
  });

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
      console.log('we are disconnected');
    });
  });

  let noteId = null;
  let testGame = null;

  beforeEach(done => {
    const myNote = new Note({
      title: 'heyheyhey',
      content: 'helllloooooo'
    });
    myNote
      .save()
      .then(note => {
        testNote = note;
        noteId = note._id;
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });

  afterEach(done => {
    Note.remove({}, err => {
      if (err) console.error(err);
      done();
    });
  });

  describe(`[POST] /new`, () => {
    it('should add a new note', done => {
      const myNote = {
        title: 'yay',
        content: 'hooray'
      };
      chai
        .request(server)
        .post('/new')
        .send(myNote)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('yay');
          done();
        });
    });
  });
});