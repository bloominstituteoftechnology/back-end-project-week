const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const Note = require('../models/NoteModel');

describe('Notes', () => {
  describe('getNoteTitle', () => {
    it('should return the name of the note', ()=> {
      const note = new Note({
        title: "this is a test",
        body: "this is the body",
      });
      expect(note.getTitle()).to.equal('this is a test');
    });
  });
})