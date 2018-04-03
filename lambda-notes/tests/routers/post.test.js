const mongoose = require('mongoose');

const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;

const server = require('./server');
chai.use(chaihttp);

const Users = require('../models');

describe('Server', () => {

    before((done) => {
        mongoose.connect('mongodb://localhost/users');
        const db = mongoose.connection;
        db.on('error', () => {
            console.error('connection error');
        });
        db.once('open', () => {
            console.log('We are connected')
            done();
        });
    });

    after((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });

    describe('[POST] /create-post', () => {
        it('should add a new post', (done) => {
            const post = {
                title: 'Great Expectations',
                author: 'Charles Dickens'
            };
            chai.request(server)
                .post('/posts')
                .send(job)
                .end((err, res) => {
                    if (err) {
                        console.error(err);
                        done();
                    }
                    expect(res.status).to.equal(200);
                    expect(res.body.name).to.equal('John Smith');
                });
            done();
        });
    });

    describe('[GET] /posts', () => {
        it('should return all posts', (done) => {
            chai.request(server)
                .get('/posts')
                .end((err, res) => {
                    if (err) console.log(err);
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.a('array');
                });
            done();
        });
    });

    describe('[PUT] /posts/:id', () => {
        it('should update a single post on /posts/<id>', (done) => {
            const first_post = new Job({
                title: 'Great Expectations',
                author: 'Charles Dickens'
            });

            const updated_post = {
                title: 'Tale of Two Cities',
                author: 'Charles Dickens'
            }

            chai.request(server)
                .get('/posts')
                .end((err, res) => {
                    chai.request(server)
                        .put('/posts/' + res.body[0]._id)
                        .send(first)
                        .end((err, res) => {
                            if (err) console.log(err);
                            expect(res.status).to.equal(200);
                            expect(res.body).to.be.a('object');
                            expect(res.body.title).to.equal('A Tale of Two Cities');
                        });
                    done();
                });
        });
    });

    describe('[DELETE] /posts/:id', () => {
        it('should delete a single post on /posts/<id>', (done) => {
            const post = {
                title: 'Tale of Two Cities',
                author: 'Charles Dickens'
            }
            chai.request(server)
            .get('/posts')
            .end((err, res) => {
                chai.request(server)
                .delete('/posts/'  + res.body[0]._id)
                .end((err, res) => {
                    if(err) console.log(err);
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body.value).to.equal('undefined');
                });
                done();
            })
        })
    })
});
