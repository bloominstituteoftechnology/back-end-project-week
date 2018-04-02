const chaiHttp = require('chai-http');
const chai = require('chai');
const mongoose = require('mongoose');

const { expect } = chai;
const User = require('../models/users');
const Note = require('../models/notes');

const userRoutes = require('../routes/users');

chai.use(chaiHttp);


describe('UserRoutes', () => {
    let id = '';
    before(done => {
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
    beforeEach(done => {
       new User({
        username: 'test',
        password: 'admin'
       }).save((err, user) => {
        if(err) throw new Error(err);
        id = user._id;
        
        const newNote = {
            title: 'test title',
            entry: 'pointless',
            author: user._id
        }
        Note.create(newNote, (err, note) => {
            if(err) throw new Error(err);
            user.Notes.push(note);
            user.save((err, u) => {
                if(err) throw new Error(err);
                done();
            });
        });
       });
    });
    afterEach(done => {
        User.remove({}, (err) => {
            if(err) throw new Error(err);
            Note.remove({}, (err) => {
                if(err) throw new Error(err);

                done();
            });
        });
    })
    describe('[GET] /', () => {
        it('should return all the users', (done) => {
            chai.request(userRoutes)
                .get('/')
                .end((err, res) => {
                    if(err) throw new Error(err);

                });
        });
    });
});