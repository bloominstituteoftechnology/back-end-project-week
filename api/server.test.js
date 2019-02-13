const request = require('supertest');
const server = require('./server.js');
const knex = require('knex');
const dbconfig = require('./knexfile');
const db = knex(dbconfig.development);


describe('/games', () => {
    it('responds with 200', async () => {
        const response = await request(server).get('/games');

        expect(response.status).toBe(200)
    })

    it('responds with json', async () => {
        const response = await request(server).get('/games');

        expect(response.type).toMatch(/json/i)
    })

    it('sends the correct response object', async () => {
        const response = await request(server).get('/games');

        expect(typeof response.body).toBe('object');
    })
})
describe('post to /games', () => {
    it('responds with 201 when body is correct', async () => {
        const body = {
            title: 'Earthbound',
            genre: 'Rpg',
            releaseYear: 1995
        }
        const response = await request(server).post('/games').send(body);

        expect(response.status).toBe(201)
    })

    it('responds with 422 when body is missing data', async () => {
        const body = {}
        const response = await request(server).post('/games').send(body);

        expect(response.status).toBe(422)
    })
    it('responds with id of created post', async () => {
        const body = {
            title: 'Super Mario Rpg',
            genre: 'Rpg',
            releaseYear: 1996
        }
        const response = await request(server).post('/games').send(body);

        expect(response.body).toEqual([5]);

    })
})
describe('retrieve single game', () => {
    it('responds with single game', async () => {
        const response = await request(server).get('/games/5');
        expect(typeof response.body).toBe('object');


    })

    it('responds with 404 when game cant be found', async () => {
        const response = await request(server).get('/games/11');
        expect(response.status).toBe(404)
    })
})
describe('delete to /games', () => {
    it('responds with amount of items deleted', async () => {
        const response = await request(server).del('/games/5');
        expect(response.body).toBe(1);

    })

    it('responds with 404 when game cant be deleted', async () => {
        const response = await request(server).del('/games/11');
        expect(response.status).toBe(404)
    })
})