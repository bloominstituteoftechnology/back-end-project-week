const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const chaiHTTP = require('chai-http');

const config = require('../api/config');

const server = require('../server');

const User = require('../users/userModel.js');

chai.use(chaiHTTP);

describe('Users', () => {
  before(done => {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.testDb);
    const testDb = mongoose.connection;
    testDb.on('error', () => console.error.bind(console, 'connection error'));
    testDb.once('open', () => {
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

  let userId;

  const getUserInfo = {
    username: 'Luis',
    passwordHash: 123456,
    firstname: 'Luis',
    lastname: 'Hernandez',
    tags: [],
    notes: [],
    contactInfo: {
      email: 'asdf@gmail.com',
      phone: 324423,
      facebook: 'name',
      twitter: 'name',
      github: 'name',
      website: 'name',
    },
  };

  const postUserInfo = {
    username: 'John',
    password: 123456,
    firstname: 'John',
    lastname: 'Huggett',
    tags: [],
    notes: [],
    contactInfo: {
      email: 'asdf@gmail.com',
      phone: 324423,
      facebook: 'name',
      twitter: 'name',
      github: 'name',
      website: 'name',
    },
  };

  beforeEach(done => {
    const testUser = new User(getUserInfo);

    testUser.save((err, savedUser) => {
      if (err) {
        done(err);
      }
      userId = testUser._id.toString();
      done();
    });
  });

  afterEach(done => {
    User.remove({}, err => {
      if (err) {
        done(err);
      }
      let userId;
      done();
    });
  });
  // endpoint: /user
  describe(`[Get] /users`, () => {
    it('should get a list of all users from the DB', done => {
      chai
        .request(server)
        .get('/users')
        .end((err, response) => {
          if (err) {
            done(err);
          }
          expect(response.status).to.equal(200);
          expect(Array.isArray(response.body)).to.equal(true);
          expect(response.body[0].username).to.equal(
            getUserInfo.username.toLowerCase()
          );
          expect(response.body[0].passwordHash).to.a('string');
          expect(response.body[0].firstname).to.equal(getUserInfo.firstname);
          expect(response.body[0].lastname).to.equal(getUserInfo.lastname);
          expect(response.body[0].notes).to.deep.equal(getUserInfo.notes);
          expect(response.body[0].contactInfo).to.deep.equal(
            getUserInfo.contactInfo
          );
          expect(response.body[0].contactInfo.email).to.a('string');
          expect(response.body[0].contactInfo.phone).to.a('number');
          expect(response.body[0].contactInfo.facebook).to.a('string');
          expect(response.body[0].contactInfo.twitter).to.a('string');
          expect(response.body[0].contactInfo.github).to.a('string');
          expect(response.body[0].contactInfo.website).to.a('string');
          done();
        });
    });
  });

  describe(`[POST] /users`, () => {
    it('should save document to the DB', done => {
      chai
        .request(server)
        .post('/users')
        .send(postUserInfo)
        .end((err, response) => {
          if (err) {
            done(err);
          }
          expect(response.status).to.equal(201);
          expect(response.body).to.be.an('object');
          expect(response.body.username).to.equal(
            postUserInfo.username.toLowerCase()
          );
          expect(response.body.passwordHash).to.a('string');
          expect(response.body.firstname).to.equal(postUserInfo.firstname);
          expect(response.body.lastname).to.equal(postUserInfo.lastname);
          expect(response.body.notes).to.deep.equal(postUserInfo.notes);
          expect(response.body.contactInfo).to.deep.equal(
            postUserInfo.contactInfo
          );
          expect(response.body.contactInfo.email).to.a('string');
          expect(response.body.contactInfo.phone).to.a('number');
          expect(response.body.contactInfo.facebook).to.a('string');
          expect(response.body.contactInfo.twitter).to.a('string');
          expect(response.body.contactInfo.github).to.a('string');
          expect(response.body.contactInfo.website).to.a('string');
          done();
        });
    });
  });
  // endpoint: /users/:id
  // endpoint: /login
  // endpoint: /logout
  // endpoint: /users/:id/changepassword
});
