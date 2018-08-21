const request = require('supertest');
const server = require('../index');
const { notes, tags, noteTags } = require('../data/testData');

describe('SERVER', () => {
    describe('Index Route', () => {
        describe('get', () => {
            it('should return OK status code', async () => {
                const res = await request(server).get('/');
                expect(res.status).toEqual(200);
            });

            it('should return NOT FOUND status code', async () => {
                const res = await request(server).get('/NOTFOUND');
                expect(res.status).toEqual(404);
            });

            it('should return response body, JSON', async () => {
                const expected = {};
                const res = await request(server).get('/');
                expect(res.body).toEqual(expected);
            });
        });
    });

    describe('Notes Route', () => {
        describe('get', () => {
            it('should return OK status code', async () => {
                const res = await request(server).get('/notes');
                expect(res.status).toEqual(200);
            });

            it('should return response body, array', async () => {
                const expected = notes;
                const res = await request(server).get('/notes');
                expect(res.body).toEqual(expected);
            });
        });

        describe('get /:id', () => {
            it('should return OK status code', async () => {
                const res = await request(server).get('/notes/1');
                expect(res.status).toEqual(200);
            });

            it('should return response body, JSON', async () => {
                const expected = {
                    id: 1,
                    title: 'The Godfather',
                    content: 'director: Francis Ford Coppola, metascore: 100',
                    tags: ['Marlon Brando', 'Al Pacino', 'Robert Duvall'],
                    created_at: '2018-08-21 17:07:12'
                };
                const res = await request(server).get('/notes/1');
                expect(res.body).toEqual(expected);
            });
        });

        // describe('post', () => {
        //     it('should return OK status code', async () => {
        //         const res = await request(server).post('/notes');
        //         expect(res.status).toEqual(200);
        //     });

        //     it('should return response body, JSON', async () => {
        //         const expected = {
        //             title: 'The Godfather',
        //             content: 'director: Francis Ford Coppola, metascore: 100',
        //             created_at: '2018-08-21 17:07:12'
        //         };
        //         const res = await request(server)
        //             .post('/notes')
        //             .send(expected);
                
        //         expect(res.body).toEqual(expected);
        //     });
        // });
    });
});
