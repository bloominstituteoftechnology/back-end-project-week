const mongoose = require('mongoose');

const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const Note = require('./models/note-model');

describe('Notes Model', () => {
    describe('getNoteTitle', () => {
        it('should return the expected note title', () => {
            const note = new Note({
                title: 'test Note test',
                content: 'notesnotesnotesnotesnotessnotenotes'
            });
            expect(note.getNoteTitle()).to.equal('test Note test');
        });
    });

    describe('getNotes', () => {
        it('should return all the notes', () => {
            sinon.stub(Note, 'find');
            Note.find.yields(null, [
                { title: 'test Note test', content: notesnotesnotesnotesnotessnotenotes },
                { name: 'Note test again', content: 'notetestnotetestnote'}
            ]);
            Note.getNotes((notes => {
                expect(notes.length).to.equal(2);
                expect(notes[1].title).to.equal('test Note test');
            }));
        });
    });

});