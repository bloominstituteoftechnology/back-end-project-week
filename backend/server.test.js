const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const should = chai.should();
const chaiHTTP = require('chai-http')

const server = require('./server.js');
const User = require('./userModel.js');
const Note = require('./noteModel.js');

describe('Notes', () => {
    before(done => {
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://myman:man@ds163769.mlab.com:63769/heroku_rghr6r91');
        const db = mongoose.connection;
        db.on('error', () => {console.error.bind()})
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

        let noteId;
        let userId;

        beforeEach(done => {
          const newNote = new Note({
            title: 'Groceries',
            content: 'Milk, eggs, world domination...',
          });
          const newUser = new User({
              username: 'Bill Nye',
              password: 'Science'
            });
                newNote
                    .save()
                    .then(savedNote => {
                    noteId = savedNote._id.toString();
                    })
                    .catch(err => {
                    console.log(err);
                    });
                newUser
                    .save()
                    .then(savedUser => {
                        userId = savedUser._id.toString();
                    })
                    .catch(err => {
                        console.log(err);
                    })
            
            done();
        });
        afterEach(done => {
          // simply remove the collections from your DB.
          Note.remove({}, err => {
            if(err) console.log(err);
            return done();
          })
          User.remove({}, err => {
              if(err) console.log(err);
              return done();
          })
        });

    describe('[POST] /api/notes/new', () => {
        it('should save a new note', done => {
            chai
                .request(server)
                .post('/api/notes/new')
                .send({ title: 'Todo',
                        content: 'go home'
                    })
                .then(res => {
                    done();
                })
                .catch(err => {
                    throw err;
                });
        })
    })

    describe('[GET] /api/users/notes', () => {
        it('should get the notes', done => {
            chai
                .request(server)
                .get('/api/notes')
                .then(response => {
                    const {_id, title, content} = response.body[0];
                    expect(_id).to.equal(noteId);
                    expect(title).to.equal('Groceries')
                    done();
                })
                .catch(err => {
                    throw err;
                });
        })
        it.skip('Fail if bad URL', () => {});
    });

    describe('[POST] /api/notes/register', () => {
        it('should register a new user', done => {
            chai
                .request(server)
                .post('/api/notes/register')
                .send({ username: 'Bob',
                        password: 'hope'
                    })
                .then(res => {
                    done();
                })
                .catch(err => {
                    throw err;
                });
        })
    })

    describe('[GET] /api/users', () => {
        it('should get the users', done => {
            chai
                .request(server)
                .get('/api/users')
                .then(response => {
                    const {_id, title, content} = response.body[0]
                    expect(_id).to.equal(userId)
                    expect(username).to.equal('Bill Nye')
                    done();
                })
        })
    })
    


    })