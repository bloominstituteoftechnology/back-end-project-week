const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');
const User = require('./models/UserModel');
const Note = require('./models/NoteModel');
const server = require ('./server');

chai.use(chaiHTTP);

describe('Games', () => {
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

    let userId;
    let noteId;

    

});