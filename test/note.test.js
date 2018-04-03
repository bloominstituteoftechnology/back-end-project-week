const mongoose = require('mongoose');
const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const noteRoutes = require('../note/noteRoutes');
chai.use(chaihttp);

const Note = require('../note/noteModel');
const User = require('../user/userModel');

let userId = null;

beforeEach(done => {
  console.log('beforeEach');
  new User({
    name: 'testing',
    email: 'testing@email.com',
    password:'testingpass'
  }).save((err, user) => {
    console.log(user);
    if (err) {
      console.log(err);
      done();
    }
    userId = user._id;
    console.log('userId', userId);
    done();
  });
});

afterEach(done => {
  console.log('afterEach');
    User.remove({}, (err) => {
    if (err) {
      console.log(err)
      done();
    };
    done();
  });
});

describe('Note', () => {

  before(done => {
    console.log('before');
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
    console.log('after');
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
      console.log('we are disconnected');
    });
  });

  describe('[POST] /api/note', () => {
    console.log('describe POST');
    it('should create a new note', (done) => {
      console.log('it should create new note');
      const newNote = {
        title: 'Test note',
        content: 'Test content',
        user: userId
      };
      chai.request(noteRoutes)
        .post('/api/note')
        .send(newNote)
        .end((err, res) => {
          console.log(res.body);
          if (err) console.error(err);
          console.log('cha res afte it test');
          expect(res.status).to.equal(200);
          // expect(res.body.name).to.equal('testUser');
          // expect(res.body.email).to.equal('test@email.com');
          // expect(res.body.password).to.not.equal('testpassword');
          // expect(res.body).to.have.own.property('_id');
          done();
        });
        done();
    });
  });
});
