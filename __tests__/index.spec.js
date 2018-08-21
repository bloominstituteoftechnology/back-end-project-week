const request = require('supertest');
const server = require('../index');

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
        });
    });

    describe('Notes Route', () => {
        describe('get', () => {
            it('should return OK status code', async () => {
                const res = await request(server).get('/notes');
                expect(res.status).toEqual(200);
            });

            it('should return response body, array', async () => {
                const expected = [{
                    id: 1,
                    title: 'The Godfather',
                    content: 'director: Francis Ford Coppola, metascore: 100',
                    // tags: ['Marlon Brando', 'Al Pacino', 'Robert Duvall'],
                    created_at: '2018-08-21 17:07:12'
                  },
                  {
                    id: 2,
                    title: 'Star Wars',
                    content: 'director: George Lucas, metascore: 92',
                    // tags: ['Mark Hamill', 'Harrison Ford', 'Carrie Fisher'],
                    created_at: '2018-08-21 17:07:12'
                  },
                  {
                    id: 3,
                    title: 'The Lord of the Rings: The Fellowship of the Ring',
                    content: 'director: Peter Jackson, metascore: 92',
                    // tags: ['Elijah Wood', 'Ian McKellen', 'Orlando Bloom'],
                    created_at: '2018-08-21 17:07:12'
                  },
                  {
                    id: 4,
                    title: 'Terminator 2: Judgement Day',
                    content: 'director: James Cameron, metascore: 94',
                    // tags: ['Arnold Schwarzenegger', 'Edward Furlong', 'Linda Hamilton'],
                    created_at: '2018-08-21 17:07:12'
                  },
                  {
                    id: 5,
                    title: 'Dumb and Dumber',
                    content: 'director: The Farely Brothers, metascore: 76',
                    // tags: ['Jim Carrey', 'Jeff Daniels', 'Lauren Holly'],
                    created_at: '2018-08-21 17:07:12'
                  },
                  {
                    id: 6,
                    title: 'Tombstone',
                    content: 'director: George P. Cosmatos, metascore: 89',
                    // tags: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
                    created_at: '2018-08-21 17:07:12'
                  }
                ];
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
    });
});
