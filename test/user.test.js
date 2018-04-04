const mongoose = require('mongoose');
const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const userRoutes = require('../user/userRoutes');
chai.use(chaihttp);

const User = require('../user/userModel');

beforeEach(done => {
  new User({
    name: 'testing',
    email: 'testing@email.com',
    password:'testinpass'
  }).save((err, user) => {
    if (err) {
      console.log(err);
      done();
    }
    done();
  });
});

afterEach(done => {
    User.remove({}, (err) => {
    if (err) console.log(err);
    done();
  });
});

describe('User', () => {
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

  describe('[POST] /api/user/signup', () => {
    it('should create a new user with hashed password', (done) => {
      const newUser = {
        name: 'testUser',
        email: 'test@email.com',
        password: 'testpassword'
      };
      chai.request(userRoutes)
        .post('/api/user/signup')
        .send(newUser)
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('testUser');
          expect(res.body.email).to.equal('test@email.com');
          expect(res.body.password).to.not.equal('testpassword');
          expect(res.body).to.have.own.property('_id');
        });
        done();
    });
  });

  describe('[POST] /api/user/login', () => {
    it('should should return a token', (done) => {
      const login = {
        email: 'testing@email.com',
        password: 'testingpass'
      };
      chai.request(userRoutes)
        .post('/api/user/login')
        .send(login)
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.own.property('name');
          expect(res.body).to.have.own.property('token');
        });
        done();
    });
  });
});