const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const Note = require('./models/NoteModel');

describe('Note Model', () => {
    before(done => {
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/test');
        const db = mongoose.connection;
        db.on('error', () => console.error.bind(console, 'There was an error connecting to the database'));
        db.once('open', () => {
            console.log('Connected to the database');
            done();
        });
    });
    after(done => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
            console.log('Connection to the database was disconnected');
        });
    });

    describe('#getTitle()', () => {
        it('should return the correct Note title', () => {
            const note = new Note ({
                title: 'Note 1',
                body: 'This is the body of Note 1'
            });
            expect(note.getTitle()).to.equal('Note 1');
        });
    });

    describe('#getAllData()', () => {
        it('should return all of the notes', () => {
            sinon.stub(Note, 'find');
            Note.find.yields(null, [
                {
                    title: 'Note 1',
                    body: 'This is just a note in which data is added to test the NoteModel we created.'
                }
            ]);
            Note.getAllData(returnObject => {
                expect(returnObject.length).to.equal(1);
                expect(returnObject[0].title).to.equal('Note 1');
                Note.find.restore();
            });
        });
    });
});