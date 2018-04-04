const mongoose = require('mongoose');
const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const noteRoutes = require('../note/noteRoutes');
chai.use(chaihttp);

const Note = require('../note/noteModel');

describe('Note', () => {

  before(done => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/test_lambdanotes');
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

  //   beforeEach(done => {
  //   console.log('1.1 beforeEach');
  //   const user = new User({
  //     name: 'testing',
  //     email: 'testing@email.com',
  //     password:'testingpass'
  //   }).save((err, user) => {
  //     console.log('saving user to db user', user);
  //     if (err) {
  //       console.log('there was an error saving user --------------------> ',err);
  //       done();
  //     }
  //     userId = user._id;
  //     console.log('finsihed saving user, userId is ----> ', userId);
  //     done();
  //   })
  // });

    beforeEach(done => {
  const user = new Note({
    title: 'Test Title',
    content: 'Test content'
  }).save((err, note) => {
    if (err) {
      console.log(err);
      done();
    }
    done();
  });
});

afterEach(done => {
    Note.remove({}, (err) => {
    if (err) console.log(err);
    done();
  });
});

  describe('[POST] /api/note', () => {
    it('should create a new note', (done) => {
      // console.log('inside it block');
      const newNote = {
        title: 'Another Test Title',
        content: 'Another test content'
      };
      chai.request(noteRoutes)
        .post('/api/note')
        .send(newNote)
        .end((err, res) => {
          // expect(err).to.be.null;
          expect(res.status).to.equal(200);
        });
        done();
    });
  });
});