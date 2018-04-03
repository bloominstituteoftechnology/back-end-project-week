const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const Note = require('./models/notes-model');

describe('Notes Model', () => {
  before((done) => {
    mongoose.connect('mongodb://localhost/test');
    const db = mongoose.connection;
    db.on('error', () => console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('we are connected');
      done();
    });
  });

  after((done) => {
    mongoose.connection.close(done);
    // mongoose.connection.db.dropDatabase(() => {
      
    //   console.log('we are disconnected');
    // });
  });

  describe('getNoteByTitle', () => {
    it('should give back the proper note title', () => {
      const note = new Note({
        noteTitle: 'Tuesday Todos',
        noteBody: 'Here is a list of todos.',
      });
      expect(note.getNoteByTitle()).to.equal('Tuesday Todos');
    });
  });

  describe('getAllNotes', () => {
    it('should return all notes', () => {
      sinon.stub(Note, 'find');
      Note.find.yields(null, [
        {
          noteTitle: 'Tuesday Todos',
          noteBody: 'Here is a list of todos.'
        },
      ]);
      Note.getAllNotes((returnObject) => {
        expect(returnObject.length).to.equal(1);
        expect(returnObject[0].noteTitle).to.equal('Tuesday Todos');
        Note.find.restore();
      });
    });
  });
});
