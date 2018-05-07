const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;

const server = require('./server.js');
const User = require('./users/User.js');

chai.use(chaiHTTP);

describe('Users', () => {
  let userId;

  before(done => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/test');
    const db = mongoose.connection;
    db.on('error', () => console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('Test DB connected');
      done();
    });
  });

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
      console.log('Test DB disconnected');
    });
    userId = null;
  });

  beforeEach(done => {
    const testUser = new User({
      username: 'Tester',
      password: 'test',
    });
    testUser.save((err, saved) => {
      userId = saved._id.toString();
      done();
    })
  });

  afterEach(done => {
    User.remove((err, removed) => {
      userId = null;
      done();
    });
  });

  describe('[GET] to /api/users', () => {
    it('should check if a user is logged in', done => {
      chai
        .request(server)
        .post('/api/users')
        .send({
          username: 'nour123',
          password: 'psaword',
          notes: ''

        })
        .end(function (err, res) {
          if (err) expect(err).to.have.status(422);
          done();
        });
    });
    it('if title and genre are not provided throws error', done => {
      chai
        .request(server)
        .post('/api/users')
        .send({
        })
        .end(function (err, res) {
          expect(res).to.have.status(422);
          done();
        });
    });
  });

  describe('[POST] to /api/users', () => {
    it('should return users in the database', done => {
      chai
        .request(server)
        .get('/api/users')
        .end(function (err, res) {
          if (err) expect(err).to.have.status(500);
          done();
        });
    });
  });

  describe('[POST] to /api/users/login', () => {
    it('should log a user in', done => {
      chai
        .request(server)
        .post(`/api/users/destroy/${userId}`)
        .send({ id: userId })
        .end(function (err, res) {
          if (err) expect(err).to.have.status(422);
          expect(res.body).to.have.property('success')
          done();
        });
    });
    it('if not found throws an error', done => {
      chai
        .request(server)
        .delete(`/api/user/destroy/3`)
        .end(function (err, res) {
          if (err) expect(err).to.have.status(422);
          done();
        });
    });
  });

  describe('[POST] to /api/users/logout', () => {
    it('should log a user out', done => {
      chai
        .request(server)
        .post('/api/users/logout')
        .send({
          'title': 'California Gamez',
          'id': `${userId}`,
        })
        .end(function (err, res) {
          if (err) expect(err).to.have.status(422);
          expect(res.body.title).to.equal('California Gamez');
          done();
        });
    });
  });
});

describe('User Model', () => {
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

  describe('#getUserName()', () => {
    it('should return the correct User title', () => {
        const user = new User ({
            username: 'nour',
            password: 'psaword',
            notes: 20
        });
        expect(user.getUserName()).to.equal('nour');
    });
});

describe('#getAllData()', () => {
    it('should return all of the users', () => {
        sinon.stub(User, 'find');
        User.find.yields(null, [
            {
                username: 'habib1234731',
                password: 'psaword',
                notes: ''
            }
        ]);
        User.getAllData(returnObject => {
            expect(returnObject.length).to.equal(1);
            User.find.restore();
        });
    });
});
});
