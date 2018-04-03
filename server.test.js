const mongoose = require('mongoose');

const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');
chai.use(chaihttp);

const NoteModel = require('./models');

describe('Server', () => {
    before(done => {
        mongoose.connect('mongodb://localhost/test');
        const db = mongoose.connection;
        db.on('error', () => {
            console.error('connection error');
        });
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

    describe('[GET] /notes/get', () => {
        it('should return all notes', done => {
            chai.request(server)
                .get('/notes/get')
                .end((err, res) => {
                    if (err) {
                        console.error(err);
                        done();
                    }
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.a('array');
                    done();
                });
        });
    });

    describe('[POST] /notes/create', () => {
        it('should add a new note', done => {
            const testPostNote = new NoteModel({
                title: 'Testing Note Title',
                content: 'TestContent TestContent TestContent TestContent TestContent TestContent',
                createdOn:'December 17, 1995 03:24:00'
            });
            chai.request(server)
                .post('/notes/create')
                .send(testPostNote)
                .end((err, res) => {
                    if (err) {
                        console.error(err);
                        done();
                    }
                    expect(res.status).to.equal(200);
                    expect(res.body.title).to.equal('Testing Note Title')
                });
                done();
        });
    });
});