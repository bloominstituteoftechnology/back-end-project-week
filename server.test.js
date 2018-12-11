const request = require('supertest');

const server = require('./server.js');

const db = require('./database/dbConfig.js')

describe('TSET FOR ROUTES IN ...server.js', () => {
    
    beforeEach(async () => {
        await db('notes').truncate();
    });

    describe('route to get all notes', () => {
        it('should return status code 200 on success.. ', async () => {
            let response = await request(server).get('/api/notes');
            expect(response.status).toBe(200);
       })

        it('should return an empty array', async () => {
            let response = await request(server).get('/api/notes');
            expect(response.body).toEqual([]);
        });
    })
})