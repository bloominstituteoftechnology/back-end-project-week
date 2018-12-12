const request = require('supertest');
const server = require('./api/server.js');
const db = require('./data/dbConfig');
const notes = require('./data/notesModel')

describe('server.js', () => {
    describe('/', () => {
        it ('should return status code of 200', async () => {
            let response = await request(server).get('/');
            
            expect (response.status).toBe(200);
        })

        it ('should return JSON', async () => {
            let response = await request(server).get('/');

            expect (response.type).toBe('application/json');
        })
    })

    describe('/api/notes', () => {
        it ('should return status code of 200', async () => {
            let response = await request(server).get('/api/notes');
            
            expect (response.status).toBe(200);
        })

        it ('should return JSON', async () => {
            let response = await request(server).get('/api/notes');

            expect (response.type).toBe('application/json');
        })
    })

    describe('/api/notes/:id', () => {
        it ('should return status code of 404 if no id is passed', async () => {
            let response = await request(server).get('/api/notes/:id');
            
            expect (response.status).toBe(404);
        })
    })


    beforeEach(async () => {
        await db('notes').truncate();
    });

    describe('/api/notes/create', () => {
        it('should insert the given note', async () => {
            let rows = await db('notes').where({ title: 'Savannah'});
            expect(rows).toHaveLength(0);

            await notes.insert({ title: 'Savannah', content: 'note content' });
            await notes.insert({ title: 'Serenna', content: 'note content'});

            rows = await db('notes').where({ title: 'Savannah'});
            expect(rows).toHaveLength(1);

            rows = await db('notes');
            expect(rows).toHaveLength(2);   
        });

        it('should return correct status code after adding user successfully', async () => {
            let response = await request(server).post('/api/notes/create').send({title: 'Serenna bobeana', content: 'note content'});
            expect(response.status).toBe(201);
        });
    })
    
})