const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');
chai.use(chaiHTTP);

const Notes = require('../api/models/NoteModel');
const server = require('../server');

describe('Notes', () => {

  describe('[POST] /api/notes', () => {
    it('should add a new note and save to the database', (done) => {
      const newNote = {
        title: 'Test Note',
        content: 'Test Note Content'
      };
      chai
        .request(server)
        .post('/api/notes')
        .send(newNote)
        .end((err, res) => {
          expect(res.body.title).to.equal('Test Note');
          done();
        });
    });
  });
});
