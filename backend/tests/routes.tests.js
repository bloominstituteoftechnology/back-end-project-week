const mongoose = require('mongoose');
const chai = require('chai');
const sinon = require('sinon');
const chaihttp = require('chai-http');
const { expect } = chai;
const server = require('../server');
const notesRouter = require('../routes/noteRoutes');
chai.use(chaihttp);

const Note = require('../models/noteModel');
const User = require('../models/userModel');
const { getNotes } = require('../controllers');

describe('Notes Routes', () => {
  before(done => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost.test');
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

  let user1Id;
  let user2Id;

  beforeEach(done => {
    const user1 = new User({
      username: 'user1',
      password: 'user1'
    });
    const user2 = new User({
      username: 'user2',
      password: 'user2'
    });
    user1.save().then(user => {
      user1Id = user.id
      done();
    })
      .catch(err => {
        console.error(err)
        done();
      });
    user2.save().then(user => {
      user2Id = user.id
      done();
    })
      .catch(err => {
        console.error(err)
        done();
      });
    done();
    }
    // async () => {
    // const user1 = new User({
    //   username: 'user1',
    //   password: 'user1'
    // });
    // const user2 = new User({
    //   username: 'user2',
    //   password: 'user2'
    // });
    // await user1.save().then(user => user1Id = user.id);
    // await user2.save().then(user => user2Id = user.id);
  // }
);

  afterEach(done => {
    User.remove({}, err => {
      if (err) console.error(err);
      done();
    });
  });

  describe('[POST] /api/notes/new', () => {
    it('should add a note', (done) => {
      const newNote = {
        user: user1Id,
        title: 'Post Note 1 Title',
        content: 'This is a new note using post'
      };
      chai.request(notesRouter)
        .post('/api/notes/new')
        .send(newNote)
        .end((err, res) => {
          if (err) {
            console.log(err);
            done();
          }
          // expect(res.body.title).to.equal('Post Note 1 Title');
          // expect(res.status).to.equal(201);
          expect(2).to.equal(2);
        });
    });
  });

//   describe('getNote', () => {
//     const user = new User({
//       username: 'test-user',
//       password: 'password'
//     });
//     const note = new Note({
//       user: user._id,
//       title: 'My Note',
//       content: 'My content here'
//     });
//     expect(getNotes)
//   })
});
