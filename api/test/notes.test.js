process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');
const server = require('../../app');

const Note = require('../models/noteModels');
const User = require('../models/userModels');
const { authenticate } = require('../utils/middleswares');

chai.use(chaiHTTP);

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

  beforeEach((done) => {
    Note.remove({}, err => {
      if (err) console.error(err);
    });
    // const loginInfo = {
    //   username: 'lalala1234',
    //   password: 'blah1234'
    // };
  });

  describe(`[GET] notes`, () => {
    it('should get all notes', (done) => {
      chai
        .request(server)
        .get('/notes')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.eql(0);
        });
        done();
    });
  });

  describe(`[POST] new`, () => {
    it('should post a new note', (done) => {
      const note = {
        title: "grocery list",
        content: "carrots, mushrooms, potatoes, chicken",
        author: ""
      };
      chai
        .request(server)
        .post('/new')
        .send(note)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('title');
          expect(res.body).to.have.property('author');
          expect(res.body).to.have.property('content');
        });
        done();
    });
  });

  describe('[PUT] edit', () => {
    it('should update a note by given information and id', (done) => {
      const note = new Note({ title: 'Jimmy\'s birthday', content: 'Feb 4th', author : '', id: '' });
      note.save((err, note) => {
        chai
          .request(server)
          .put('/edit')
          .send(note)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('content').to.eql('Feb 4th');
          });
          done();
      });
    });
  });

  describe('[DELETE] delete/:id', () => {
    it('should delete a note by given ID', (done) => {
      const note = new Note({ title: 'test', content: 'testing', author: '' });
      note.save((err, note) => {
        chai
          .request(server)
          .delete(`/delete/${note.id}`)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.ok).to.be.true;
          });
          done();
      });
    });
  });

});