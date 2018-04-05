const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
const server = require('./server');

chai.use(chaiHTTP);

const Note = require('./api/models/noteModel');
const User = require('./api/models/userModel');

describe('Users', () => {

  before(done => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/newtest');
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

  afterEach(done => {
    // simply remove the collections from your DB.
    User.remove({}, (err) => {
      if (err) {
        console.error(err);
      }
      done();
    });
  });

  describe('[POST] /api/users', () => {
    const user = {
      name: 'monkey',
      password: 'bananas'
    };

    it('should return a success message when user is created', (done) => {
      chai.request(server)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('User successfully created.');
        done();
      });
    });

  });

//   describe('[POST] /api/login', () => {
//     it('should do a thing', (done) => {
      
//     });
//   });
// });

// describe('Notes', () => {
//   describe('[POST] /api/users', () => {
//     it('should do a thing', (done) => {

//     });
//   });
});