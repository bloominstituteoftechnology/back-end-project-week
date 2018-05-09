const chai = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');

const { expect } = chai;
const User = require('../models/users');
const Note = require('../models/notes');

const server = require('../server');

describe('UserRoutes', () => {
    let id = '';

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
                id = note._id;
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
    describe('[GET] /users', () => {
        it('should return all the users', done => {
            authenticatedUser.get('/users').end((err, res) => {
                if (err) {
                    throw new Error(err);
                    return;
                }
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.equal(1);
                done();
            });
        });
    });
    describe('[POST] /users/register', () => {
        it('should create new user', done => {
            authenticatedUser
                .post('/users/register')
                .send({ username: 'regTest', password: 'pass' })
                .end((err, res) => {
                    if (err) {
                        throw new Error(err);
                        return;
                    }
                    expect(res.status).to.equal(201);

                    User.findOne({ username: 'regTest' })
                        .then(u => {
                            expect(u).to.not.be.null;
                            done();
                        })
                        .catch(err => {
                            throw new Error(err);
                            done();
                        });
                });
        });
        it('should error with missing/bad info', done => {
            authenticatedUser
                .post('/users/register')
                .send({ password: 'pass' })
                .end((err, res) => {
                    if (err) {
                        throw new Error(err);
                        return;
                    }
                    expect(res.status).to.equal(422);
                    done();
                });
        });
    });

    describe('[POST] /users/login', () => {
        it('should log user in', done => {
            authenticatedUser
                .post('/users/login')
                .send({ username: 'test', password: 'admin' })
                .end((err, res) => {
                    if (err) {
                        throw new Error(err);
                        return;
                    }
                    expect(res.status).to.equal(200);
                    expect(res.body.success).to.equal(true);
                    done();
                });
        });

        it('should not log in a user that doesnt exist', done => {
            authenticatedUser
                .post('/users/login')
                .send({ username: 'fake', password: 'fake' })
                .end((err, res) => {
                    if (err) {
                        throw new Error(err);
                        return;
                    }

                    expect(res.status).to.equal(422);
                    done();
                });
        });

        it('should not log in a user with the wrong password', done => {
            authenticatedUser
                .post('/users/login')
                .send({ username: 'test', password: 'fake' })
                .end((err, res) => {
                    if (err) throw new Error(err);

                    expect(res.status).to.equal(422);
                    done();
                });
        });
    });
});
