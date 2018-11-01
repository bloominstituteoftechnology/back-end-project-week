const request = require('supertest');

const server = require('./api/apiRoutes');

const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

describe('server', () => {
    describe('initial tests', () => {
        it('should return true', () => {
            expect(true).toBeTruthy();
        });
        it('should return false', () => {
            expect(false).toBeFalsy();
        });
    });

    describe('route handlers', () => {
        beforeAll(function(done) {
            db.migrate.latest()
            .then(function() {
                return db.seed.run()
                .then(function() {
                    done();
                });
            });
        });

        beforeEach(function(done) {
            db.migrate.rollback()
            .then(function() {
                db.migrate.latest()
                .then(function() {
                    return db.seed.run()
                    .then(function() {
                        done();
                    });
                });
            });
        });

        afterEach(function(done) {
            db.migrate.rollback()
            .then(function() {
                done();
            });
        });

        afterAll(function(done) {
            db.migrate.latest()
            .then(function() {
                return db.seed.run()
                .then(function() {
                    done();
                });
            });
        });

        describe('GET /', () => {
            it('should return 200 OK', async () => {
                const response = await request(server).get('/');
    
                expect(response.status).toBe(200);
            });
            it('should return JSON', async () => {
                const response = await request(server).get('/');

                expect(response.type).toBe('application/json');
            });
            it('should return { message: "server is up" }', async () => {
                const response = await request(server).get('/');

                expect(response.body).toEqual({ message: 'server is up' });
            });
        });

        describe('GET /notes', () => {
            it('should return notes', (done) => {
                request(server)
                .get('/notes')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
            });
            it('should not return text/html', async () => {
                const response = await request(server).get('/notes');

                expect(response.type).not.toBe('text/html');
            });
            it('should return an array', async () => {
                const response = await request(server).get('/notes');

                expect(response.body).toBeInstanceOf(Array);
            });
        });

        describe('GET /notes/:id', () => {
            it('should return a note', (done) => {
                request(server)
                .get('/notes/1')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
            });
            it('should return not found', (done) => {
                request(server)
                .get('/notes/47')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(404)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
            });
            it('should have three properties', async () => {
                const response = await request(server).get('/notes/2');

                expect(response.body).toEqual(expect.objectContaining({ title: expect.any(String), textBody: expect.any(String), tags: expect.any(String) }));
            });
        });

        describe('POST /notes', () => {
            it('should add a note', (done) => {
                request(server)
                .post('/notes')
                .send({ "title": "Shakespeare Dialogue", "textBody": "O regal burden! Wherefore doth tawdry insolence grant pardon for the wind's horrors?", "tags": "Skakespeare" })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
            });
            it('should accept null', (done) => {
                request(server)
                .post('/notes')
                .send({ "title": "Shakespeare Dialogue", "textBody": "From whence doth bruising purpose render up th' rain's good nature? Yea!", "tags": null })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201, done);
            });
            it('should have all required fields', (done) => {
                request(server)
                .post('/notes')
                .send({ "title": "Shakespeare Dialogue" })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
            });
        });

        describe('PUT /notes/:id', () => {
            it('should update a note', (done) => {
                request(server)
                .put('/notes/5')
                .send({ "title": "Pretentious Academic" })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
            });
            it('should not update a note', (done) => {
                request(server)
                .put('/notes/3')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500, done);
            });
            it('should have all required fields', (done) => {
                request(server)
                .put('/notes/4')
                .send({ "title": null })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500, done);
            });
        });

        describe('DELETE /notes/:id', () => {
            it('should remove a note', (done) => {
                request(server)
                .delete('/notes/2')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
            });
            it('should return not found', (done) => {
                request(server)
                .delete('/notes/8')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(404)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
            });
            it('should ignore body', (done) => {
                request(server)
                .delete('/notes/4')
                .send({ "test": "pass" })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
            });
        });
    });
});