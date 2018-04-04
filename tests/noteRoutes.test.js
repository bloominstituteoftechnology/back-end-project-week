const chai = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');

const { expect } = chai;
const User = require('../models/users');
const Note = require('../models/notes');

const server = require('../server');

describe('NotesRoutes', () => {
    let noteId = '';
    let userId = '';

    const authenticatedUser = request.agent(server);
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
    beforeEach(function(done) {
        this.timeout(6000);
        const creds = {
            username: 'test',
            password: 'admin',
        };

        User.create(creds, (err, user) => {
            if (err) {
                throw new Error(err);
                return;
            }
            userId = user._id;
            const newNote = {
                title: 'test title',
                entry: 'pointless',
                author: user._id,
            };
            Note.create(newNote, (err, note) => {
                if (err) {
                    throw new Error(err);
                    return;
                }
                noteId = note._id;
                User.update(
                    { _id: user._id },
                    { $push: { Notes: note._id } },
                    (err, num) => {
                        authenticatedUser
                            .post('/users/login')
                            .send(creds)
                            .end((err, res) => {
                                if (err) {
                                    throw new Error(err);
                                    return;
                                }
                                done();
                            });
                    }
                );
            });
        });
    });
    afterEach(done => {
        User.remove({}, err => {
            if (err) {
                throw new Error(err);
                return;
            }
            Note.remove({}, err => {
                if (err) {
                    throw new Error(err);
                    return;
                }
                done();
            });
        });
        // done();
    });
    after(done => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
            console.log('we are disconnected');
        });
    });

    describe('[POST] /notes/new', () => {
        it('should create a new note', done => {
            authenticatedUser
                .post('/notes/new')
                .send({ title: 'testNote', entry: 'testEntry' })
                .end((err, res) => {
                    if (err) {
                        throw new Error(err);
                        return;
                    }
                    expect(res.status).to.equal(201);

                    Note.findById(res.body._id)
                        .then(result => {
                            expect(result).to.not.be.null;
                            done();
                        })
                        .catch(err => {
                            throw new Error(err);
                            done();
                        });
                });
        });

        it('should create the note on the correct user', done => {
            authenticatedUser
                .post('/notes/new')
                .send({ title: 'testNote', entry: 'testEntry' })
                .end((err, res) => {
                    if (err) {
                        throw new Error(err);
                        return;
                    }
                    expect(res.status).to.equal(201);

                    User.findById(userId)
                        .then(user => {
                            expect(user.Notes).to.include(noteId);
                            done();
                        })
                        .catch(err => {
                            throw new Error(err);
                            done();
                        })
                });
        });
    });

    describe('[POST] /notes/remove/:id', () => {
        it('should remove the note', done => {
            authenticatedUser
                .post(`/notes/remove/${noteId}`)
                .end((err, res) => {
                    if(err) {
                        throw new Error(err);
                        return;
                    }
                    expect(res.status).to.equal(200);
                    Note.findById(noteId)
                        .then(result => {
                            expect(result).to.be.null;
                            done();
                        })
                        .catch(err => {
                            throw new Error(err);
                            done();
                        })
                });
        });
    });

    describe('[PUT] /notes/edit/:id', () => {
        it('should edit a note', done => {
            authenticatedUser
                .put(`/notes/edit/${noteId}`)
                .send({ title: 'edited', entry: 'skimask' })
                .end((err, res) => {
                    if(err) {
                        throw new Error(err);
                        return;
                    }
                    expect(res.status).to.equal(200);
                    Note.findById(noteId)
                        .then(result => {
                            expect(result).to.deep.include({ title: 'edited', entry: 'skimask' });
                            done();
                        })
                        .catch(err => {
                            throw new Error(err);
                            done();
                        })
                });
        });
    });

    describe('[GET] /notes/:id', () => {
        it('should return the correct note', done => {
            authenticatedUser
                .get(`/notes/${noteId}`)
                .end((err, res) => {
                    if(err) {
                        throw new Error(err);
                        return;
                    }
                    expect(res.status).to.equal(200);
                    expect(res.body).to.deep.include({ title: 'test title', entry: 'pointless' });
                    done();
                });
        });
    });

    describe('[GET] /notes/', () => {
        it('should return all notes', done => {
            authenticatedUser
                .get('/notes')
                .end((err, res) => {
                    if(err) {
                        throw new Error(err);
                        return;
                    }
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });
});
